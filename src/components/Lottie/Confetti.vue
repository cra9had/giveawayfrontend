<script setup>
import { Vue3Lottie } from "vue3-lottie";
import confetti from "@/assets/lottie/confetti.json";
</script>

<template>
  <Vue3Lottie
    :animationData="confetti"
    height="full"
    width="full"
    :loop="false"
  />
</template>
