<script setup>
import { useUserStore } from "../../stores/useUserStore";

import clipboard from "../../utils/clipboard";

const copy = () => {
  clipboard(profile.value);
};
import Hero from "../../components/Hero/Hero.vue";
import Button from "../../components/Button/Button.vue";
import Counter from "@/components/Counter/Counter.vue";
</script>

<template>
  <transition name="fade">
    <main class="h-dvh  p-4 flex flex-col gap-5">

    <Hero title="Вы учувствуйте в розыгрыше!" image="check" description="Не отписывайтесь от каналов до окончания розыгрыша!"/>
      <Counter time="06:01:52" text="До завершения"/>
    <Button
        colorScheme="light"
        title="Подробнее о розыгрыше"
            />
    </main>
  </transition>
</template>
