<script setup>
import { onMounted, ref } from "vue";
const webapp = window.Telegram.WebApp;
onMounted(() => {
  webapp.expand();
  window.addEventListener("touchmove", (e) => e.preventDefault(), {
    passive: false,
  });
  webapp.ready();
});
</script>

<template>
  <main class="flex justify-center">
    <div class="max-w-lg">
      <router-view></router-view>
    </div>
  </main>
</template>
