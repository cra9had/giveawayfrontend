<script setup>
import { useUserStore } from "@/stores/useUserStore";

const userStore = useUserStore();

const emit = defineEmits(["submit"]);

const props = defineProps({
  colorScheme: String,
  title: String,
  a: String,
});

const click = (e) => {
  if (!props.a) {
    e.preventDefault();
    emit("submit");
  }
};
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
      'font-gilroy font-medium text-center cursor-pointer transition text-[16px] inline-flex justify-center items-center min-h-[50px] rounded-[6px] max-w-lg px-4 active:opacity-75',
    ]"
  >
    {{ title }}
  </a>
</template>
