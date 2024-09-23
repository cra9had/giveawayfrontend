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
import {onMounted} from "vue";
import {useRouter} from "vue-router";

const userStore = useUserStore();
const webapp = window.Telegram.WebApp;
const router = useRouter();
onMounted(() => {
  webapp.BackButton.show();
  webapp.BackButton.onClick(() => {
    router.go(-1);
  });
  webapp.MainButton.hide();
  webapp.MainButton.isVisible = false;
});
</script>

<style scoped></style>
