<script setup>
import { useUserStore } from "@/stores/useUserStore.js";
import { ref, onMounted, watch } from "vue";

const userStore = useUserStore();
const emit = defineEmits(["submit"]);

const props = defineProps({
  colorScheme: String,
  title: String,
  a: String,
  timer: {
    type: String,
    required: false,
  },
});

const countdown = ref(props.timer);
let interval;

const startCountdown = () => {
  const [minutes, seconds] = countdown.value.split(':').map(Number);
  let timeLeft = minutes * 60 + seconds;

  interval = setInterval(() => {
    timeLeft--;
    const newMinutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const newSeconds = (timeLeft % 60).toString().padStart(2, '0');
    countdown.value = `${newMinutes}:${newSeconds}`;

    if (timeLeft <= 0) clearInterval(interval);
  }, 1000);
};

const click = (e) => {
  if (!props.a) {
    e.preventDefault();
    emit("submit");
  }
};

onMounted(() => {
  if (props.timer) startCountdown();
});

watch(() => props.timer, () => {
  if (interval) clearInterval(interval);
  startCountdown();
});
</script>

<template>
  <a
      :href="a"
      target="_blank"
      @click="(e) => click(e)"
      :class="[
      colorScheme === 'light' &&
        (userStore.colorScheme === 'light'
          ? 'bg-[#D0D9FA] text-[#1B1C37]'
          : 'bg-[#262744] text-[#FFFFFF]'),
      colorScheme === 'orange' &&
        (userStore.colorScheme === 'light'
          ? 'bg-orange_color text-white'
          : 'bg-orange_color text-white'),
      'font-gilroy font-medium text-center cursor-pointer transition text-[16px] flex justify-center items-center min-h-[50px] rounded-[6px] w-full max-w-lg px-2 active:opacity-75',
    ]"
  >
    {{ title }}
    <span v-if="countdown">({{ countdown }})</span>
  </a>
</template>
