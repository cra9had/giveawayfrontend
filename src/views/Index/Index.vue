<script setup>

import clipboard from "@/utils/clipboard";

const copy = () => {
  clipboard(profile.value);
};
import Hero from "../../components/Hero/Hero.vue";
import Button from "../../components/Button/Button.vue";
import Counter from "@/components/Counter/Counter.vue";
import Ticket from "@/components/Hero/Ticket.vue";
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
      <div class="tickets flex flex-col justify-center gap-1">
        <Ticket image="user" title="Пригласить друзей" description="<p> Получи дополнительный билет, пригласив друзей! </p>" />
        <Ticket image="ticket" title="Билет: 1HL9R3" description="<p> Получен: <strong>03.09.2021, 14:20 </strong> </p>" />
      </div>
    </main>
  </transition>
</template>
