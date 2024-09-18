<script setup>
import { useUserStore } from "../../stores/useUserStore";

import clipboard from "../../utils/clipboard";

const copy = () => {
  clipboard(profile.value);
};
import Hero from "../../components/Hero/Hero.vue";
</script>

<template>
  <transition name="fade">
    <Hero title="sdfasf"/>
  </transition>
</template>
