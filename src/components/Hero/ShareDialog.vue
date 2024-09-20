<template>
  <div
    :class="[
      ' max-w-[600px] font-medium font-gilroy',
      userStore.colorScheme === 'light'
        ? 'bg-primary_white_color'
        : 'bg-primary_dark_color',
    ]"
    class="p-3 flex flex-col justify-center rounded-t-lg w-full max-h-[90vh] overflow-y-auto text-center"
  >
    <div class="m-l-auto flex flex-col justify-start gap-4 items-start">
      <div
        @click="closeDialog"
        class="reject cursor-pointer font-gilroy text-[14px] font-normal text-orange_color"
      >
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
      <main
        class="m-l-auto flex flex-col justify-start gap-2 items-start w-full"
      >
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
          <input
            type="text"
            v-model="link"
            readonly
            class="copy-input p-2 font-medium font-gilroy outline-none rounded-[6px] h-[50px]"
            :class="[
              userStore.colorScheme === 'light'
                ? 'bg-[#D0D9FA] text-primary_dark_color'
                : 'bg-primary_dark_color text-[#fff]',
            ]"
          />
          <div class="grid grid-cols-2 gap-2">
            <Button @click="copy" colorScheme="orange" title="Скопировать" />
            <Button
              @click="shareContact"
              colorScheme="orange"
              title="Поделиться"
            />
          </div>
        </div>
      </main>
      <main
        class="m-l-auto flex flex-col justify-start gap-2 items-start w-full"
      >
        <p
          :class="[
            ' text-[18px] font-normal font-gilroy',
            userStore.colorScheme === 'light'
              ? 'text-primary_dark_color'
              : 'text-text_light_color',
          ]"
        >
          Статистика:
        </p>
        <div
          class="dialog_card w-full rounded-[6px] p-2 text-left flex flex-col gap-2"
          :class="[
            userStore.colorScheme === 'light' ? 'bg-[#fff]' : 'bg-[#32334B]',
          ]"
        >
          <div class="grid grid-cols-2 gap-2">
            <div class="flex flex-col gap-2">
              <p
                :class="[
                  'text-[14px] leading-[16px] font-bold font-gilroy',
                  userStore.colorScheme === 'light'
                    ? 'text-primary_dark_color'
                    : 'text-[#fff]',
                ]"
              >
                0
              </p>
              <p
                :class="[
                  'text-[14px] leading-[16px] font-medium font-gilroy',
                  userStore.colorScheme === 'light'
                    ? 'text-[#737E87]'
                    : 'text-text_light_color',
                ]"
              >
                Перешло по ссылке
              </p>
            </div>
            <div class="flex flex-col gap-2">
              <p
                :class="[
                  'text-[14px] leading-[16px] font-bold font-gilroy',
                  userStore.colorScheme === 'light'
                    ? 'text-primary_dark_color'
                    : 'text-[#fff]',
                ]"
              >
                0
              </p>
              <p
                :class="[
                  'text-[14px] leading-[16px] font-medium font-gilroy',
                  userStore.colorScheme === 'light'
                    ? 'text-[#737E87]'
                    : 'text-text_light_color',
                ]"
              >
                Участвует в розыгрыше
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/useUserStore.js";
import Button from "@/components/Button/Button.vue";
import clipboard from "@/utils/clipboard";
import { ref } from "vue";

const userStore = useUserStore();
const emit = defineEmits(["close"]);
const link = ref("https://t.me/LotoClubBot/app?startapp=L2cb4c0");
const bot_username = ref("lotoclubdevbot");
const closeDialog = () => {
  emit("close");
};
const copy = () => {
  clipboard(link.value);
  link.value = "скопирован ✅🔗";
};
function shareContact() {
  const inviteLink = `https://t.me/share/url?url=https://t.me/${bot_username.value}&text=Join%20this%20awesome%20bot%20and%20get%20extra%20tickets!`;
  window.open(inviteLink, "_blank");
}
</script>

<style>
.copy-input {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
