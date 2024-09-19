<template>
  <div
    :class="[
      ' max-w-[600px] font-medium font-gilroy',
      userStore.colorScheme === 'light'
        ? 'bg-primary_white_color'
        : 'bg-primary_dark_color',
    ]"
    class="p-2 flex flex-col justify-center rounded-t-lg w-full max-h-[90vh] overflow-y-auto text-center"
  >
    <div class="m-l-auto flex flex-col justify-start gap-2 items-start">
      <div class="reject font-gilroy text-[14px] font-normal text-orange_color">
        Отмена
      </div>
      <div
        class="dialog_card rounded-[6px] p-2 text-left flex flex-col gap-1"
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
          Хотите больше шансов на <br />
          победу в розыгрыше? Приглашайте друзей!
        </p>
        <p
          :class="[
            'text-[14px] leading-[16px] font-medium font-gilroy',
            userStore.colorScheme === 'light'
              ? 'text-[#737E87]'
              : 'text-text_light_color',
          ]"
        >
          Для этого отправьте им свою реферальную ссылку, и когда один ваш друг
          примет участие, вы увеличите свои шансы на победу, получив +1
          дополнительный билет для розыгрыша.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/useUserStore.js";

const userStore = useUserStore();
</script>

<style></style>
