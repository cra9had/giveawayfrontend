<template>
  <div
    ref="scrollContainer"
    class="flex max-h-[100vh] transition overflow-scroll flex-col p-4 gap-4 w-full min-w-[345px]"
  >
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
        {{ giveaway.description }}
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
          name="slide-right"
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
import { nextTick, onMounted, ref } from "vue";
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
import {all} from "axios";
const visibleItems = ref([]);
const scrollContainer = ref(null);
const apiUrl = import.meta.env.VITE_API_URL;
const giveaway = userStore.giveaway;
const logs = giveaway.logs;
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
      `<div class="circle w-[6px] h-[6px] bg-orange_color rounded-full"></div> Количество участников - ${giveaway.total_participants}`,
    additionalClass: "flex items-center gap-1 py-4",
    visible: false,
  },
  {
    component: "div",
    innerHTML: "Начинаем розыгрыш!",
    additionalClass: "font-bold py-4",
    visible: false,
  }
];
const webapp = window.Telegram.WebApp;
const router = useRouter();


onMounted(() => {
  webapp.BackButton.show();
  webapp.MainButton.hide();
  webapp.MainButton.isVisible = false;
  webapp.BackButton.onClick(() => {
    router.go(-1);
  });

  for (let i = 0; i < logs.length; i++) {
    let log = logs[i];
    if (log.type === "choice_participant") {
      allItems.push({
        component: "div",
        innerHTML: `Выбираем победителя на <span class="font-bold"> ${log.position} место</span>`,
        additionalClass: "py-4",
        visible: false,
      });
    } else if (log.type === "select_ticket") {
      allItems.push({
        component: "div",
        innerHTML: `
      <div class="flex items-center gap-1">
        <div class="circle w-[6px] h-[6px] bg-orange_color rounded-full"></div>
        Выбран билет: <span class="font-bold">${log.selected_ticket}</span>
      </div>
      <a class="username font-bold font-gilroy text-[14px]" href="https://t.me/${log.username}">${log.username}</a>
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
      })
    } else if (log.type === "check_terms") {
      let counter = 1;
      allItems.push({
        component: "div",
        innerHTML: `
      Проверяем выполнение условий <br />
    розыгрыша:
    <div class="progress_list flex flex-col gap-2">
      ${
            giveaway.terms_of_participation.bet.required
                ? `
          <div class="flex flex-col items-start justify-start gap-1">
            <p>${counter++}. Ставки на сумму ${giveaway.terms_of_participation.bet.sum} тенге</p>
            <div class="text-[12px] rounded-[50px] ${ log.errors.includes('bet') ? "w-[90px] bg-orange_color": "w-[73px] bg-[#00C172]" } flex items-center justify-center h-[20px] leading-[14px] font-bold font-gilroy">${ log.errors.includes('bet') ? "Не выполнено": "Выполнено" }</div>
          </div>
        `
                : ""
        }
      ${
            giveaway.terms_of_participation.deposit.required
                ? `
          <div class="flex flex-col items-start justify-start gap-1">
            <p>${counter++}. Депозит на сумму ${giveaway.terms_of_participation.deposit.sum} тенге</p>
            <div class="text-[12px] rounded-[50px] ${ log.errors.includes('deposit') ? "w-[90px] bg-orange_color": "w-[73px] bg-[#00C172]" } flex items-center justify-center h-[20px] leading-[14px] font-bold font-gilroy">${ log.errors.includes('deposit') ? "Не выполнено": "Выполнено" }</div>
          </div>
        `
                : ""
        }
      ${
            giveaway.terms_of_participation.confirm_email_required
                ? `
          <div class="flex flex-col items-start justify-start gap-1">
            <p>${counter++}. Подтвердил электронную почту</p>
            <div class="text-[12px] rounded-[50px] ${ log.errors.includes("confirm_email_required") ? "w-[90px] bg-orange_color": "w-[73px] bg-[#00C172]" } flex items-center justify-center h-[20px] leading-[14px] font-bold font-gilroy">${ log.errors.includes("confirm_email_required") ? "Не выполнено": "Выполнено" }</div>
          </div>
        `
                : ""
        }
      ${
            giveaway.terms_of_participation.confirm_phone_required
                ? `
          <div class="flex flex-col items-start justify-start gap-1">
            <p>${counter++}. Подтвердил номер телефона</p>
            <div class="text-[12px] rounded-[50px] ${ log.errors.includes('confirm_phone_required') ? "w-[90px] bg-orange_color": "w-[73px] bg-[#00C172]" } flex items-center justify-center h-[20px] leading-[14px] font-bold font-gilroy">${ log.errors.includes('confirm_phone_required') ? "Не выполнено": "Выполнено" }</div>
          </div>
        `
                : ""
        }
    </div>
    `,
        additionalClass: "flex flex-col gap-2 font-bold py-4",
        visible: false,
      })
    } else if (log.type === "participant_win") {
      allItems.push(
          {
            component: "div",
            innerHTML: `
      <div class="circle min-w-[6px] h-[6px] bg-orange_color rounded-full"></div>
      <p style="transform: translateY(-4px)">
        Участник с билетом
        <span class="font-bold">«${log.selected_ticket}» (${log.user_link})</span>
        побеждает и занимает <br />
        <span class="font-bold">${log.position} место</span> в розыгрыше!
      </p>
    `,
            additionalClass: "flex gap-1 py-4",
            visible: false,
          })
    }
  }
  allItems.push({
    component: "div",
    innerHTML: "Поздравляем победителей!",
    additionalClass: "py-4",
    visible: false,
  })
  for (let i=0; i < giveaway.winners_tickets.length; i++) {
    let current_ticket = giveaway.winners_tickets[i]
    allItems.push({
      component: WinnerCard,
      props: {
        userImage: image,
        username: current_ticket.participant_username,
        title: `Билет: <b>«${current_ticket.number_ticket}»</b>`,
        id: current_ticket.position,
      },
      visible: false,
    })
  }
  allItems.push({
    component: "div",
    innerHTML:
        '<div class="circle w-[6px] h-[6px] bg-[#00C172] rounded-full"></div> Розыгрыш завершен',
    additionalClass: "font-bold flex items-center gap-1 py-4 text-[#00C172]",
    visible: false,
  })
  console.log(allItems);

  allItems.forEach((item, index) => {
    setTimeout(() => {
      visibleItems.value.push({ ...item, visible: true });

      // nextTick(() => {
      //   if (scrollContainer.value) {
      //     scrollContainer.value.scrollTo({
      //       top: scrollContainer.value.scrollHeight,
      //       behavior: "smooth",
      //     });
      //   }
      // });
    }, index * 600);
  });
});
</script>
<style></style>
