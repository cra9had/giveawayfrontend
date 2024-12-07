<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import clipboard from "@/utils/clipboard";
import Hero from "../../components/Hero/Hero.vue";
import Button from "../../components/Button/Button.vue";
import Counter from "@/components/Counter/Counter.vue";
import Ticket from "@/components/Hero/Ticket.vue";
import ShareDialog from "@/components/Hero/ShareDialog.vue";
import { useUserStore } from "@/stores/useUserStore.js";
import AboutDialog from "@/components/Hero/AboutDialog.vue";
const userStore = useUserStore();

const isOpen = ref(false);
const aboutDialogOpen = ref(false);
const giveaway = userStore.giveaway;

const openDialog = () => {
  isOpen.value = true;
};


const openAboutDialog = () => {
  aboutDialogOpen.value = true;
};

const closeDialog = (event) => {
  if (event.target.classList.contains("modal-overlay")) {
    isOpen.value = false;
  }
};

const handleKeyDown = (event) => {
  if (event.key === "Escape") {
    isOpen.value = false;
    aboutDialogOpen.value = false;
  }
};
const webapp = window.Telegram.WebApp;

onMounted(() => {
  document.addEventListener("keydown", handleKeyDown);
  webapp.BackButton.hide();
  webapp.MainButton.hide();
  webapp.MainButton.isVisible = false;
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyDown);
});
</script>

<template>
  <main class="h-dvh items-center justify-center  p-4 flex flex-col gap-5">
    <Hero
      title="Вы учувствуйте в розыгрыше!"
      image="check"
      description="Не отписывайтесь от каналов до окончания розыгрыша!"
    />
    <Counter time="06:01:52" text="До завершения" />
    <Button colorScheme="light" title="Подробнее о розыгрыше" @click="openAboutDialog" />
    <div class="tickets flex flex-col justify-center gap-1">
      <Ticket
        @click="openDialog"
        image="user"
        title="Пригласить друзей"
        description="<p> Получи дополнительный билет, пригласив друзей! </p>"
      />

      <Ticket
        image="ticket"
        v-for="ticket in giveaway.tickets"
        :title="`Билет: ${ticket.number_ticket}`"
        :description="`<p> Получен: <strong>${ticket.create_date} </strong> </p>`"
        link="ticket"
      />
    </div>
  </main>

  <Teleport to="body">
    <transition name="slide-top">
      <div
          v-if="aboutDialogOpen"
          class="modal-overlay fixed inset-0 bg-[#17212BCC] flex justify-center items-end z-50"
          @click="closeAboutDialog"
      >
        <AboutDialog @close="aboutDialogOpen = false" />
      </div>
    </transition>
    <transition name="slide-top">
      <div
        v-if="isOpen"
        class="modal-overlay fixed inset-0 bg-[#17212BCC] flex justify-center items-end z-50"
        @click="closeDialog"
      >
        <ShareDialog @close="isOpen = false" />
      </div>
    </transition>
  </Teleport>
</template>

<style scoped></style>
