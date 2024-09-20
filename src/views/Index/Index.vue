<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import clipboard from "@/utils/clipboard";
import Hero from "../../components/Hero/Hero.vue";
import Button from "../../components/Button/Button.vue";
import Counter from "@/components/Counter/Counter.vue";
import Ticket from "@/components/Hero/Ticket.vue";
import ShareDialog from "@/components/Hero/ShareDialog.vue";

const isOpen = ref(false);

const copy = () => {
  clipboard(profile.value);
};

const openDialog = () => {
  isOpen.value = true;
};

const closeDialog = (event) => {
  if (event.target.classList.contains('modal-overlay')) {
    isOpen.value = false;
  }
};

const handleKeyDown = (event) => {
  if (event.key === 'Escape') {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
  <main class="h-dvh p-4 flex flex-col gap-5">
    <Hero
        title="Вы учувствуйте в розыгрыше!"
        image="check"
        description="Не отписывайтесь от каналов до окончания розыгрыша!"
    />
    <Counter time="06:01:52" text="До завершения" />
    <Button colorScheme="light" title="Подробнее о розыгрыше" />
    <div class="tickets flex flex-col justify-center gap-1">
      <Ticket
          @click="openDialog"
          image="user"
          title="Пригласить друзей"
          description="<p> Получи дополнительный билет, пригласив друзей! </p>"
      />
      <Ticket
          image="ticket"
          title="Билет: 1HL9R3"
          description="<p> Получен: <strong>03.09.2021, 14:20 </strong> </p>"
          link="ticket"
      />
    </div>
  </main>
    <Teleport to="body">
      <transition name="slide-top">
        <div v-if="isOpen"
             class="modal-overlay fixed inset-0 bg-[#17212BCC] flex justify-center items-end z-50"
             @click="closeDialog">
          <ShareDialog @close="isOpen = false" />
        </div>
      </transition>
    </Teleport>
</template>

<style scoped>
</style>