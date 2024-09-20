<script setup>

import {onMounted} from "vue";

defineProps({
  title:{
    required: false,
    default: "Ошибка!",
    type: String,
  },
  description: {
    required: false,
    default: `Данная функция<br />находится в разработке`,
    type: String,
  }
})
const webapp = window.Telegram.WebApp;

onMounted(() => {
  webapp.BackButton.show();
});
</script>

<template>
  <transition name="fade" appear>
    <div class="flex p-4 flex-col justify-center items-center h-dvh ">
   {{title}}
    <router-link to="/" class="text-[blue] font-underline">home</router-link>
    </div>
  </transition>
</template>
