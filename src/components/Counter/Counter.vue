<template>
  <section class="flex flex-col items-center justify-center gap-1">
    <p
      v-if="time && !isGreen"
      class="font-gilroy font-bold text-[18px] text-center text-orange_color"
    >
      {{ formattedTime }}
    </p>
    <p
      v-if="startDate"
      class="font-gilroy font-bold text-[18px] text-center text-orange_color"
    >
      {{ startDate }}
    </p>

    <p
      v-if="text"
      :class="[
        'text-[14px] leading-[16px] font-medium font-gilroy',
        userStore.colorScheme === 'light' ? 'text-[#737E87]' : 'text-[#B0B3C5]',
      ]"
    >
      {{ text }}
    </p>
    <p
      v-if="isGreen"
      :class="[
        'text-[14px] leading-[16px] font-bold text-[#00C172] font-gilroy',
      ]"
    >
      {{ isGreen }}
    </p>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useUserStore } from "@/stores/useUserStore.js";
const userStore = useUserStore();
const props = defineProps({
  text: {
    type: String,
    required: false,
  },
  startDate: {
    type: String,
    required: false,
  },
  isGreen: {
    type: String,
    required: false,
  },
});

const remainingSeconds = ref(0);
const time = userStore.giveaway.time_remaining

const parseTime = (timeString) => {
  const parts = timeString.split(":").map(Number);
  let totalSeconds = 0;

  if (parts.length === 3) {
    totalSeconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    totalSeconds = parts[0] * 60 + parts[1];
  } else if (parts.length === 1) {
    totalSeconds = parts[0];
  }

  return isNaN(totalSeconds) ? 0 : totalSeconds;
};

const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  } else if (minutes > 0) {
    return `00:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  } else {
    return `00:00${seconds.toString().padStart(2, "0")}`;
  }
};

const formattedTime = computed(() => formatTime(remainingSeconds.value));

let intervalId;

const startCounter = () => {
  if (time) {
    remainingSeconds.value = parseTime(time);
    intervalId = setInterval(() => {
      if (remainingSeconds.value > 0) {
        remainingSeconds.value--;
      } else {
        clearInterval(intervalId);
      }
    }, 1000);
  }
};

onMounted(() => {

  startCounter();
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<style scoped></style>
