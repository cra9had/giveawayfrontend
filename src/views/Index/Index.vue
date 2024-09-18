<script setup>
import { useUserStore } from "../../stores/useUserStore";

import clipboard from "../../utils/clipboard";

const copy = () => {
  clipboard(profile.value);
};
import Hero from "../../components/Hero/Hero.vue";
import Button from "../../components/Button/Button.vue";
</script>

<template>
  <transition name="fade">
    <main class="h-dvh  p-4 flex flex-col gap-2">

    <Hero title="Вы учувствуйте в розыгрыше!" image="check" description="Не отписывайтесь от каналов до окончания розыгрыша!"/>
    <Button
        colorScheme="light"
        title="Подробнее о розыгрыше"
            />
    </main>
  </transition>
</template>
