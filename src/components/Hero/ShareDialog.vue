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
      <div @click="closeDialog" class="reject cursor-pointer font-gilroy text-[14px] font-normal text-orange_color">
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
      <p
          :class="[
      ' text-[18px] font-normal font-gilroy',
      userStore.colorScheme === 'light'
        ? 'text-primary_dark_color'
        : 'text-text_light_color',
    ]"
      >
        Ваша реферальная ссылка:
      </p>
      <div
          class="dialog_card w-full rounded-[6px] p-2 text-left flex flex-col gap-2"
          :class="[
          userStore.colorScheme === 'light' ? 'bg-[#fff]' : 'bg-[#32334B]',
        ]"
      >

        <input type="text" value="https://t.me/LotoClubBot/app?startapp=L2cb4c0" readonly class="copy-input p-2 font-medium font-gilroy   outline-none rounded-[6px] h-[50px]"
               :class="[
          userStore.colorScheme === 'light' ? 'bg-[#D0D9FA] text-primary_dark_color' : 'bg-primary_dark_color text-[#fff]',
        ]"
        >
<div class="grid grid-cols-2 gap-2">

  <Button colorScheme="orange" title="Скопировать" />
  <Button colorScheme="orange" title="Поделиться" />
</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/useUserStore.js";
import Button from "@/components/Button/Button.vue";
const userStore = useUserStore();
const emit = defineEmits(['close']);

const closeDialog = () => {
  emit('close');
}
</script>

<style>
.copy-input {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
