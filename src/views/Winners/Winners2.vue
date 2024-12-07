<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Hero from "../../components/Hero/Hero.vue";
import Button from "../../components/Button/Button.vue";
import Counter from "@/components/Counter/Counter.vue";
import image from "@/assets/icons/user.svg";

const isOpen = ref(false);

import { useUserStore } from "@/stores/useUserStore.js";
import WinnerCard from "@/components/Winners/WinnerCard.vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const giveaway = userStore.giveaway
const handleKeyDown = (event) => {
  if (event.key === "Escape") {
    isOpen.value = false;
  }
};

function getDescription () {
  const descriptions = []
  console.log(giveaway.tickets)
  this.giveaway.tickets.forEach(function (ticket, index, array){
    console.log(ticket)
    if (ticket.is_winner) {
      descriptions.push(`
    Поздравляем! Вы заняли ${ticket.position} место в розыгрыше: <b><span class=''>${giveaway.title}</span></b>, <br/>
    ваш выигрышный билет <b><span class='font-uppercase'>«${ticket.number_ticket}»</span></b>.
    Для получения приза свяжитесь с администратором розыгрыша:
  `)

    }
  })
  return descriptions.join('\n');

}

const webapp = window.Telegram.WebApp;
const router = useRouter();
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
      title="Вы победили в розыгрыше!"
      :image="userStore.colorScheme === 'light' ? 'light_prize' : 'dark_prize'"
      :description="getDescription()"
    />
    <div
      class="cup-title text-[16px] font-bold font-gilroy leading-[19px] text-center"
    >
      Loto Club
    </div>
    <Counter :startDate="giveaway.end_datetime" isGreen="Завершился" />
    <div class="flex items-center justify-center">
      <Button colorScheme="light" title="Как выбирались победители" />
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
          v-for="winner in giveaway.winners_tickets"

          :username="`@${winner.participant_username}`"
          :title="`Билет: <b>«${winner.number_ticket}»</b>`"
          :id="winner.position"
        />
      </div>
    </div>
  </main>
</template>

<style scoped></style>
