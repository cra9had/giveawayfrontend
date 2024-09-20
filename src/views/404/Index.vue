<script setup>
import Hero from "../../components/Hero/Hero.vue";
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
</script>

<template>
  <transition name="fade" appear>
    <div class="flex flex-col justify-center items-center h-dvh ">
   {{title}}
    </div>
  </transition>
</template>
