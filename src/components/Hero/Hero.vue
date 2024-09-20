<script setup>
import { useUserStore } from "@/stores/useUserStore.js";
const userStore = useUserStore();
import { computed } from "vue";
import check from "@/assets/icons/check.svg";
import dark_cup from "@/assets/icons/dark_cup.svg";
import light_cup from "@/assets/icons/light_cup.svg";
import error from "@/assets/icons/error.svg";
import dark_paper from "@/assets/icons/dark_paper.svg";
import light_paper from "@/assets/icons/light_paper.svg";
import dark_prize from "@/assets/icons/dark_prize.svg";
import light_prize from "@/assets/icons/light_prize.svg";
import dark_search from "@/assets/icons/dark_search.svg";
import light_search from "@/assets/icons/light_search.svg";

const props = defineProps({
  title: String,
  description: String,
  secondDescription: String,
  is_error: Boolean,
  image: {
    type: String,
    required: false,
  },
});
const images = {
  check,
  dark_cup,
  light_cup,
  error,
  light_paper,
  dark_paper,
  dark_prize,
  light_prize,
  dark_search,
  light_search,
};

const selectedImage = computed(() => images[props.image]);
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <div class="flex flex-col items-center text-center gap-2">
      <!-- <DuckError v-if="is_error" />
      <Duck v-if="!is_error && lottie" :name="lottie" /> -->
      <img
        draggable="false"
        class="mb-2 select-none"
        v-if="image"
        :src="selectedImage"
        alt=""
      />
      <h1 v-if="title" class="font-gilroy font-bold text-[20px] leading-[24px]">
        {{ title }}
      </h1>
      <p
        v-if="description"
        :class="[
          'text-[16px] leading-[19px] font-medium font-gilroy',
          userStore.colorScheme === 'light'
            ? 'text-[#737E87]'
            : 'text-[#B0B3C5]',
        ]"
        v-html="description"
      ></p>
      <p
        v-if="secondDescription"
        :class="[
          'text-[16px] leading-[19px] font-medium font-gilroy',
          userStore.colorScheme === 'light'
            ? 'text-[#737E87]'
            : 'text-[#B0B3C5]',
        ]"
        v-html="secondDescription"
      ></p>
    </div>
  </div>
</template>
