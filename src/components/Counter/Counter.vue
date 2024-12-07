<template>
  <section class="flex flex-col items-center justify-center gap-1">
    <p
      v-if="endTime && !isGreen"
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

// Get the Unix time of when the countdown ends from the user store
const endTime = userStore.giveaway.time_remaining;

// Format time into "hh:mm:ss"
const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

// Computed property to provide formatted remaining time
const formattedTime = computed(() => formatTime(remainingSeconds.value));

let intervalId;

// Function to calculate remaining time
const calculateRemainingTime = () => {
  const currentTime = Math.floor(Date.now() / 1000); // Current Unix timestamp in seconds
  remainingSeconds.value = Math.max(0, endTime - currentTime);
};

// Start the countdown
const startCounter = () => {
  calculateRemainingTime(); // Set the initial value immediately
  intervalId = setInterval(() => {
    calculateRemainingTime();
    if (remainingSeconds.value === 0) {
      clearInterval(intervalId);
    }
  }, 1000);
};

// Lifecycle hooks
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
