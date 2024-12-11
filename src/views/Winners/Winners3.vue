<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Hero from "../../components/Hero/Hero.vue";
import Button from "../../components/Button/Button.vue";
import Counter from "@/components/Counter/Counter.vue";
import image from "@/assets/icons/user.svg";

const isOpen = ref(false);

import { useUserStore } from "@/stores/useUserStore.js";
import WinnerCard from "@/components/Winners/WinnerCard.vue";
import {useRouter} from "vue-router";

const userStore = useUserStore();



const handleKeyDown = (event) => {
  if (event.key === "Escape") {
    isOpen.value = false;
  }
};

const webapp = window.Telegram.WebApp;

const router = useRouter();


const GoToProgress = () => {
  router.push(
      {name: 'progress'}
  )
}


onMounted(() => {
  webapp.BackButton.show();
  webapp.BackButton.onClick(() => {
    router.go(-1);
  });
  webapp.MainButton.hide();
  webapp.MainButton.isVisible = false;
  document.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyDown);
});
</script>

<template>
  <main class="h-dvh p-4 flex flex-col gap-5">
    <Hero
      title="Поздравляем победителя!"
      :image="userStore.colorScheme === 'light' ? 'light_cup' : 'dark_cup'"
      description="Победители выбраны случайным образом из всех участников, которые выполнили условия.Розыгрыш:"
    />

    <div
      class="cup-title text-[16px] font-bold font-gilroy leading-[19px] text-center"
    >
      Название «Розыгрыша»
    </div>
    <Counter startDate="03.09.2024, 20:22" isGreen="Завершился" />
    <div class="flex items-center justify-center">
      <Button colorScheme="light" title="Как выбирались победители" @click="GoToProgress"/>
    </div>
    <div class="winners">
      <p
        :class="[
          ' text-[18px] font-normal font-gilroy',
          userStore.colorScheme === 'light'
            ? 'text-primary_dark_color'
            : 'text-text_light_color',
        ]"
      >
        Победитель
      </p>
      <div class="winners_card flex flex-col gap-1">
        <WinnerCard
          :userImage="image"
          username="Nik@..."
          title="Билет: <b>«1uL8y4»</b>"
          :id="1"
        />
        <WinnerCard
          :userImage="image"
          username="Nik@..."
          title="Билет: <b>«7bt9Q5»</b>"
          :id="2"
        />
      </div>
    </div>
  </main>
</template>

<style scoped></style>
