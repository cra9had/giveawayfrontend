<script setup>
import { useUserStore } from "@/stores/useUserStore.js";
const userStore = useUserStore();
import {computed} from "vue";
import check from "@/assets/icons/check.svg";
import cup from "@/assets/icons/cup.svg";
import error from "@/assets/icons/error.svg";
import papers from "@/assets/icons/papers.svg";
import prize from "@/assets/icons/prize.svg";
import search from "@/assets/icons/search.svg";

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
  cup,
  error,
  papers,
  prize,
  search
};

const selectedImage = computed(() => images[props.image]);
</script>

<template>
  <div class="flex justify-center items-center">
    <div class="flex flex-col items-center text-center gap-2 max-w-[280px]">
      <!-- <DuckError v-if="is_error" />
      <Duck v-if="!is_error && lottie" :name="lottie" /> -->
      <img draggable="false" class="mb-2 select-none" v-if="image" :src="selectedImage" alt="">
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
      >

      </p>  <p
        v-if="secondDescription"
        :class="[
          'text-[16px] leading-[19px] font-medium font-gilroy',
          userStore.colorScheme === 'light'
            ? 'text-[#737E87]'
            : 'text-[#B0B3C5]',
        ]"
        v-html="secondDescription"
      >

      </p>
    </div>
  </div>
</template>
