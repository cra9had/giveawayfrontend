<script setup>
import { useUserStore } from "../../stores/useUserStore";

const userStore = useUserStore();

defineProps({
  title: String,
  description: String,
  is_error: Boolean,
  lottie: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <div class="flex justify-center items-center">
    <div class="flex flex-col items-center text-center gap-y-2 max-w-[280px]">
      <!-- <DuckError v-if="is_error" />
      <Duck v-if="!is_error && lottie" :name="lottie" /> -->
      <h1 v-if="title" class="font-semibold text-2xl leading-tight">
        {{ title }}
      </h1>
      <p
        v-if="description"
        :class="[
          'text-lg leading-tight font-normal',
          userStore.colorScheme === 'light'
            ? 'text-[#4E4E4E]'
            : 'text-[#8E8E94]',
        ]"
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>
