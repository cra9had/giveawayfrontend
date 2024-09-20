<script setup>
import { useUserStore } from "@/stores/useUserStore";

const userStore = useUserStore();

const emit = defineEmits(["submit"]);

const props = defineProps({
  colorScheme: String,
  title: String,
  a: String,
  link: String,
});

const click = (e) => {
  if (!props.a) {
    e.preventDefault();
    emit("submit");
  }
};
</script>

<template>
  <router-link
    :to="link"
    :class="[
      colorScheme === 'light' &&
        (userStore.colorScheme === 'light'
          ? 'bg-[#D0D9FA] text-[#1B1C37]'
          : 'bg-[#262744] text-[#FFFFFF]'),
      colorScheme === 'orange' &&
        (userStore.colorScheme === 'light'
          ? 'bg-orange_color text-white'
          : 'bg-orange_color text-white'),
      'font-gilroy font-medium text-center cursor-pointer transition text-[16px] flex justify-center items-center h-[50px] rounded-[6px] w-full max-w-lg px-2 active:opacity-75',
    ]"
  >
    {{ title }}
  </router-link>
</template>
