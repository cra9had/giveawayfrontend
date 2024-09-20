<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Hero from "../../components/Hero/Hero.vue";
import Button from "../../components/Button/Button.vue";
import Counter from "@/components/Counter/Counter.vue";
import image from "@/assets/icons/user.svg";

const isOpen = ref(false);

import { useUserStore } from "@/stores/useUserStore.js";
import WinnerCard from "@/components/Winners/WinnerCard.vue";

const userStore = useUserStore();

const openDialog = () => {
  isOpen.value = true;
};

const closeDialog = (event) => {
  if (event.target.classList.contains("modal-overlay")) {
    isOpen.value = false;
  }
};

const handleKeyDown = (event) => {
  if (event.key === "Escape") {
    isOpen.value = false;
  }
};

const webapp = window.Telegram.WebApp;

onMounted(() => {
  webapp.BackButton.show();
  webapp.BackButton.onClick(() => {
    router.go(-1);
  });
  document.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyDown);
});
</script>

<template>
  <main class="h-dvh p-4 flex flex-col gap-5">
    <Hero
      title="Вы победили в розыгрыше!"
      :image="userStore.colorScheme === 'light' ? 'light_prize' : 'dark_prize'"
      :description="`
    Поздравляем! Вы заняли 1 место в розыгрыше: <b><span class='text-black'>Название «Розыгрыша»</span></b>, <br/>
    ваш выигрышный билет <b><span class='font-uppercase text-black'>«1HL9R3»</span></b>.
    Для получения приза свяжитесь с администратором розыгрыша:
  `"
    />

    <div
      class="cup-title text-[16px] font-bold font-gilroy leading-[19px] text-center"
    >
      Loto Club
    </div>
    <Counter startDate="03.09.2024, 20:22" isGreen="Завершился" />
    <Button colorScheme="light" title="Как выбирались победители" />
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
          :id="9999"
        />
      </div>
    </div>
  </main>
</template>

<style scoped></style>
