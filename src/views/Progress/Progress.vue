<template>
  <div class="flex flex-col p-4 gap-4 w-full min-w-[345px]">
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
          ' text-[18px] font-normal font-gilroy',
          userStore.colorScheme === 'light'
            ? 'text-primary_dark_color'
            : 'text-text_light_color',
        ]"
      >
        Параметры розыгрыша
      </p>
      <div class="dialog_card w-full text-left flex flex-col gap-1">
        <div
          :class="[
            'text-[14px] leading-[16px] font-medium font-gilroy rounded-[6px] p-2',
            userStore.colorScheme === 'light'
              ? 'text-primary_dark_color'
              : 'text-[#fff]',
            userStore.colorScheme === 'light' ? 'bg-[#fff]' : 'bg-[#32334B]',
          ]"
        >
          Загрузка участников розыгрыша... <br />
          100%
        </div>
        <div
          :class="[
            'text-[14px] leading-[16px] font-bold py-4 font-gilroy rounded-[6px] p-2',
            userStore.colorScheme === 'light'
              ? 'text-primary_dark_color'
              : 'text-[#fff]',
            userStore.colorScheme === 'light' ? 'bg-[#fff]' : 'bg-[#32334B]',
          ]"
        >
          Участники загружены!
        </div>
        <div
          :class="[
            'text-[14px] leading-[16px] font-medium flex items-center gap-1 py-4 font-gilroy rounded-[6px] p-2',
            userStore.colorScheme === 'light'
              ? 'text-primary_dark_color'
              : 'text-[#fff]',
            userStore.colorScheme === 'light' ? 'bg-[#fff]' : 'bg-[#32334B]',
          ]"
        >
          <div
            class="circle w-[6px] h-[6px] bg-orange_color rounded-full"
          ></div>
          Количество участников - 2
        </div>
        <div
          :class="[
            'text-[14px] leading-[16px] font-bold py-4 font-gilroy rounded-[6px] p-2',
            userStore.colorScheme === 'light'
              ? 'text-primary_dark_color'
              : 'text-[#fff]',
            userStore.colorScheme === 'light' ? 'bg-[#fff]' : 'bg-[#32334B]',
          ]"
        >
          Начинаем розыгрыш!
        </div>
        <div
          :class="[
            'text-[14px] leading-[16px] font-medium py-4 font-gilroy rounded-[6px] p-2',
            userStore.colorScheme === 'light'
              ? 'text-primary_dark_color'
              : 'text-[#fff]',
            userStore.colorScheme === 'light' ? 'bg-[#fff]' : 'bg-[#32334B]',
          ]"
        >
          Выбираем победителя на <span class="font-bold"> 1 место</span>
        </div>
        <div
          class="bg-cover bg-center bg-right-ticket"
          :class="[
            'text-[14px] leading-[16px] flex justify-between  items-center gap-1  font-medium py-4 font-gilroy rounded-[6px] p-2 ',
            userStore.colorScheme === 'light'
              ? 'text-primary_dark_color'
              : 'text-[#fff]',
            userStore.colorScheme === 'light'
              ? 'bg-light-right-ticket'
              : 'bg-dark-right-ticket',
          ]"
        >
          <div class="flex items-center gap-1">
            <div
              class="circle w-[6px] h-[6px] bg-orange_color rounded-full"
            ></div>
            Выбран билет: <span class="font-bold"> «1uL8y4»</span>
          </div>
          <div class="username font-bold font-gilroy text-[14px]">Nik@...</div>
        </div>
        <div
          :class="[
            'text-[14px] leading-[16px] flex flex-col gap-2 font-bold py-4 font-gilroy rounded-[6px] p-2',
            userStore.colorScheme === 'light'
              ? 'text-primary_dark_color'
              : 'text-[#fff]',
            userStore.colorScheme === 'light' ? 'bg-[#fff]' : 'bg-[#32334B]',
          ]"
        >
          Проверяем выполнение условий <br />
          розыгрыша:
          <div class="progress_list flex flex-col gap-2">
            <div class="flex flex-col items-start justify-start gap-1">
              <p
                :class="[
                  'text-[14px] leading-[16px] font-medium  font-gilroy rounded-[6px] ',
                  userStore.colorScheme === 'light'
                    ? 'text-primary_dark_color'
                    : 'text-[#fff]',
                  userStore.colorScheme === 'light'
                    ? 'bg-[#fff]'
                    : 'bg-[#32334B]',
                ]"
              >
                1. Ставки на сумму 1000 тенге в игре Lemon
              </p>
              <div
                  class="text-[12px] bg-[#00C172] rounded-[50px] w-[73px] flex items-center justify-center h-[20px]  leading-[14px] font-bold font-gilroy',"
                  :class="
                  userStore.colorScheme === 'light'
                    ? 'text-[#1B1C37]'
                    : 'text-[#fff]'
                "
              >
                Выполнено
              </div>
            </div>
            <div class="flex flex-col items-start justify-start gap-1">
              <p
                :class="[
                  'text-[14px] leading-[16px] font-medium  font-gilroy rounded-[6px] ',
                  userStore.colorScheme === 'light'
                    ? 'text-primary_dark_color'
                    : 'text-[#fff]',
                  userStore.colorScheme === 'light'
                    ? 'bg-[#fff]'
                    : 'bg-[#32334B]',
                ]"
              >
                2. Подписка вашего друга в телеграмм канале
              </p>
              <div
                class="text-[12px] bg-[#00C172] rounded-[50px] w-[73px] flex items-center justify-center h-[20px]  leading-[14px] font-bold font-gilroy',"
                :class="
                  userStore.colorScheme === 'light'
                    ? 'text-[#1B1C37]'
                    : 'text-[#fff]'
                "
              >
                Выполнено
              </div>
            </div>
            <div class="flex flex-col items-start justify-start gap-1">
              <p
                :class="[
                  'text-[14px] leading-[16px] font-medium  font-gilroy rounded-[6px] ',
                  userStore.colorScheme === 'light'
                    ? 'text-primary_dark_color'
                    : 'text-[#fff]',
                  userStore.colorScheme === 'light'
                    ? 'bg-[#fff]'
                    : 'bg-[#32334B]',
                ]"
              >
                3. Подтвердил номер телефона
              </p>
              <div
                  class="text-[12px] bg-[#00C172] rounded-[50px] w-[73px] flex items-center justify-center h-[20px]  leading-[14px] font-bold font-gilroy',"
                  :class="
                  userStore.colorScheme === 'light'
                    ? 'text-[#1B1C37]'
                    : 'text-[#fff]'
                "
              >
                Выполнено
              </div>
            </div>
          </div>
        </div>
        <div
          :class="[
            'flex  gap-1 py-4 rounded-[6px] p-2',
            userStore.colorScheme === 'light'
              ? 'text-primary_dark_color'
              : 'text-[#fff]',
            userStore.colorScheme === 'light' ? 'bg-[#fff]' : 'bg-[#32334B]',
          ]"
        >
          <div
            class="circle min-w-[6px] h-[6px] bg-orange_color rounded-full"
          ></div>
          <p
            :class="[
              'text-[14px] leading-[16px] font-medium',
              userStore.colorScheme === 'light'
                ? 'text-primary_dark_color'
                : 'text-[#fff]',
              userStore.colorScheme === 'light' ? 'bg-[#fff]' : 'bg-[#32334B]',
            ]"
            style="transform: translateY(-4px)"
          >
            Участник с билетом
            <span class="font-bold">«1uL8y4» (Nik@...)</span> <br />
            побеждает и занимает <span class="font-bold">1 место</span> в <br />
            розыгрыше!
          </p>
        </div>
        <div
          :class="[
            'text-[14px] leading-[16px] font-medium py-4 font-gilroy rounded-[6px] p-2',
            userStore.colorScheme === 'light'
              ? 'text-primary_dark_color'
              : 'text-[#fff]',
            userStore.colorScheme === 'light' ? 'bg-[#fff]' : 'bg-[#32334B]',
          ]"
        >
          Поздравляем победителей!
        </div>
        <WinnerCard
          :userImage="image"
          username="Nik@..."
          title="Билет: <b>«1uL8y4»</b>"
          :id="1"
        />
        <div
          :class="[
            'text-[14px] leading-[16px] font-bold flex items-center gap-1 py-4 font-gilroy rounded-[6px] p-2',
            userStore.colorScheme === 'light'
              ? 'text-[#00C172]'
              : 'text-[#00C172]',
            userStore.colorScheme === 'light' ? 'bg-[#fff]' : 'bg-[#32334B]',
          ]"
        >
          <div class="circle w-[6px] h-[6px] bg-[#00C172] rounded-full"></div>
          Количество участников - 2
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/useUserStore.js";
import { ref } from "vue";
const userStore = useUserStore();
const parameters = ref([
  "Участников: 1",
  "Призовых мест: 1",
  "Дата розыгрыша: <b>03.09.2024, 20:22 </b>",
]);
import image from "@/assets/icons/user.svg";
import WinnerCard from "@/components/Winners/WinnerCard.vue";
</script>

<style scoped></style>
