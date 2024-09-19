<template>
  <div class="pt-4">
    <Hero
      title="Проверяем выполнение условий"
      description="Не отписывайтесь от каналов до окончания розыгрыша!"
      :image="
        userStore.colorScheme === 'light' ? 'light_search' : 'dark_search'
      "
    />
  </div>
</template>

<script setup>
import Hero from "@/components/Hero/Hero.vue";
import { useUserStore } from "@/stores/useUserStore.js";

const userStore = useUserStore();
</script>

<style scoped></style>
