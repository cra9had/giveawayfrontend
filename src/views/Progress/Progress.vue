<template>
  <div ref="scrollContainer" class="flex max-h-[100vh] overflow-scroll flex-col p-4 gap-4 w-full relative min-w-[345px]">
    <div
      class="dialog_card w-full rounded-[6px] p-2 text-left flex flex-col gap-1"
      :class="[
        userStore.colorScheme === 'light' ? 'bg-[#fff]' : 'bg-[#32334B]',
      ]"
    >
      <p
        :class="[
          'text-[14px] leading-[16px] font-bold font-gilroy',
          userStore.colorScheme === 'light'
            ? 'text-primary_dark_color'
            : 'text-[#fff]',
        ]"
      >
        Описание
      </p>
      <p
        :class="[
          'text-[14px] leading-[16px] font-bold font-gilroy',
          userStore.colorScheme === 'light'
            ? 'text-primary_dark_color'
            : 'text-[#fff]',
        ]"
      >
        .....
      </p>
    </div>
    <div class="dialog_card">
      <p
        :class="[
          ' text-[18px] font-normal font-gilroy',
          userStore.colorScheme === 'light'
            ? 'text-primary_dark_color'
            : 'text-text_light_color',
        ]"
      >
        Параметры розыгрыша
      </p>
      <div
        class="dialog_card w-full rounded-[6px] p-2 text-left flex flex-col gap-2"
        :class="[
          userStore.colorScheme === 'light' ? 'bg-[#fff]' : 'bg-[#32334B]',
        ]"
      >
        <div
          class="parameters flex items-center gap-1"
          v-for="parameter in parameters"
          :key="parameter"
        >
          <div
            class="circle w-[6px] h-[6px] bg-orange_color rounded-full"
          ></div>
          <p
            :class="[
              'text-[14px] leading-[16px] font-medium font-gilroy',
              userStore.colorScheme === 'light'
                ? 'text-primary_dark_color'
                : 'text-[#fff]',
            ]"
            v-html="parameter"
          />
        </div>
      </div>
    </div>
    <div class="dialog_card">
      <p
        :class="[
          'text-[18px] font-normal font-gilroy',
          userStore.colorScheme === 'light'
            ? 'text-primary_dark_color'
            : 'text-text_light_color',
        ]"
      >
        Параметры розыгрыша
      </p>
      <div class="dialog_card w-full text-left flex flex-col gap-1" ref="cards">
        <transition-group
          name="fade-slide"
          tag="div"
          class="flex flex-col gap-1"
        >
          <div
            v-for="(item, index) in visibleItems"
            :key="index"
            v-show="item.visible"
            :class="[
              'text-[14px] leading-[16px] font-medium font-gilroy rounded-[6px] px-2',
              userStore.colorScheme === 'light'
                ? 'text-primary_dark_color'
                : 'text-[#fff]',
              userStore.colorScheme === 'light' ? 'bg-[#fff]' : 'bg-[#32334B]',
            ]"
            :style="item.style"
          >
            <div
              v-if="item.innerHTML"
              v-html="item.innerHTML"
              :class="item.additionalClass"
              :style="item.style"
            ></div>
            <component :is="item.component" v-bind="item.props">
              <template
                class="flex flex-col"
                v-if="item.innerHTML"
                v-html="item.innerHTML"
              ></template>
            </component>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/useUserStore.js";
import {nextTick, onMounted, ref} from "vue";
const userStore = useUserStore();
const parameters = ref([
  "Участников: 1",
  "Призовых мест: 1",
  "Дата розыгрыша: <b>03.09.2024, 20:22 </b>",
]);
import image from "@/assets/icons/user.svg";
import WinnerCard from "@/components/Winners/WinnerCard.vue";
import { useRouter } from "vue-router";
import Confetti from "@/components/Lottie/Confetti.vue";
const visibleItems = ref([]);
const scrollContainer = ref(null);

const allItems = [
  {
    component: "div",
    innerHTML: "Загрузка участников розыгрыша... <br /> 100%",
    visible: false,
    additionalClass: "font-bold py-4",
  },
  {
    component: "div",
    innerHTML: "Участники загружены!",
    additionalClass: "font-bold py-4",
    visible: false,
  },
  {
    component: "div",
    innerHTML:
      '<div class="circle w-[6px] h-[6px] bg-orange_color rounded-full"></div> Количество участников - 2',
    additionalClass: "flex items-center gap-1 py-4",
    visible: false,
  },
  {
    component: "div",
    innerHTML: "Начинаем розыгрыш!",
    additionalClass: "font-bold py-4",
    visible: false,
  },
  {
    component: "div",
    innerHTML: 'Выбираем победителя на <span class="font-bold"> 1 место</span>',
    additionalClass: "py-4",
    visible: false,
  },
  {
    component: "div",
    innerHTML: `
      <div class="flex items-center gap-1">
        <div class="circle w-[6px] h-[6px] bg-orange_color rounded-full"></div>
        Выбран билет: <span class="font-bold"> «1uL8y4»</span>
      </div>
      <div class="username font-bold font-gilroy text-[14px]">Nik@...</div>
    `,
    additionalClass:
      "bg-cover bg-center bg-right-ticket flex justify-between items-center gap-1 py-4",
    style: {
      backgroundImage:
        userStore.colorScheme === "light"
          ? "url(bg-light-right-ticket.png)"
          : "url(bg-dark-right-ticket.png)",
    },
    visible: false,
  },
  {
    component: "div",
    innerHTML: `
      Проверяем выполнение условий <br />
      розыгрыша:
      <div class="progress_list flex flex-col gap-2">
        <div class="flex flex-col items-start justify-start gap-1">
          <p>1. Ставки на сумму 1000 тенге в игре Lemon</p>
          <div class="text-[12px] bg-[#00C172] rounded-[50px] w-[73px] flex items-center justify-center h-[20px] leading-[14px] font-bold font-gilroy">Выполнено</div>
        </div>
        <div class="flex flex-col items-start justify-start gap-1">
          <p>2. Подписка вашего друга в телеграмм канале</p>
          <div class="text-[12px] bg-[#00C172] rounded-[50px] w-[73px] flex items-center justify-center h-[20px] leading-[14px] font-bold font-gilroy">Выполнено</div>
        </div>
        <div class="flex flex-col items-start justify-start gap-1">
          <p>3. Подтвердил номер телефона</p>
          <div class="text-[12px] bg-[#00C172] rounded-[50px] w-[73px] flex items-center justify-center h-[20px] leading-[14px] font-bold font-gilroy">Выполнено</div>
        </div>
      </div>
    `,
    additionalClass: "flex flex-col gap-2 font-bold py-4",
    visible: false,
  },
  {
    component: "div",
    innerHTML: `
      <div class="circle min-w-[6px] h-[6px] bg-orange_color rounded-full"></div>
      <p style="transform: translateY(-4px)">
        Участник с билетом
        <span class="font-bold">«1uL8y4» (Nik@...)</span>
        побеждает и занимает <br />
        <span class="font-bold">1 место</span> в розыгрыше!
      </p>
    `,
    additionalClass: "flex gap-1 py-4",
    visible: false,
  },
  {
    component: "div",
    innerHTML: "Поздравляем победителей!",
    additionalClass: "py-4",
    visible: false,
  },
  {
    component: WinnerCard,
    props: {
      userImage: image,
      username: "Nik@...",
      title: "Билет: <b>«1uL8y4»</b>",
      id: 1,
    },
    visible: false,
  },
  {
    component: "div",
    innerHTML:
      '<div class="circle w-[6px] h-[6px] bg-[#00C172] rounded-full"></div> Количество участников - 2',
    additionalClass: "font-bold flex items-center gap-1 py-4 text-[#00C172]",
    visible: false,
  },
];
const webapp = window.Telegram.WebApp;
const router = useRouter();
onMounted(() => {
  webapp.BackButton.show();
  webapp.BackButton.onClick(() => {
    router.go(-1);
  });

  allItems.forEach((item, index) => {
    setTimeout(() => {
      visibleItems.value.push({ ...item, visible: true });

      nextTick(() => {
        if (scrollContainer.value) {
          scrollContainer.value.scrollTo({
            top: scrollContainer.value.scrollHeight,
            behavior: 'smooth'
          });
        }
      });
    }, index * 600);
  });
});

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.dialog_card div {
  opacity: 0;
  transform: translateY(10px);
  animation: fadeInUp 0.5s ease forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
