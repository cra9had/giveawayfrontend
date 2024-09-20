<template>
  <div
    :class="[
      'flex justify-between items-center p-2 gap-2 rounded-[4px] cursor-pointer bg-cover bg-no-repeat bg-center',
      userStore.colorScheme === 'light' ? 'bg-light-ticket' : 'bg-dark-ticket',
    ]"
  >
    <div class="flex items-center gap-2">
      <img
        :src="userImage"
        draggable="false"
        alt=""
        class="w-[40px] h-[40px] rounded-full"
      />
      <div class="flex flex-col justify-center gap-1">
        <p
          :class="[
            'text-[14px]  min-w-[200px] leading-[16px] font-bold font-gilroy',
            userStore.colorScheme === 'light'
              ? 'text-[#1B1C37]'
              : 'text-[#FFFFFF]',
          ]"
          v-html="username"
        />
        <p
          :class="[
            'text-[14px]  min-w-[200px] leading-[16px] font-medium font-gilroy',
            userStore.colorScheme === 'light'
              ? 'text-[#1B1C37]'
              : 'text-[#B0B3C5]',
          ]"
          v-html="title"
        />
      </div>
    </div>
    <div
      class="id bg-orange_color rounded-[50px] px-1 flex items-center justify-center text-white font-bold font-gilroy text-[12px] w-[47px] h-[20px]"
    >
      #{{ id }}
    </div>
  </div>
</template>

<script setup>
import dark_ticket from "@/assets/icons/ticket_dark_bg.svg";
import light_ticket from "@/assets/icons/ticket_light_bg.svg";

import { computed } from "vue";
import { useUserStore } from "@/stores/useUserStore.js";

const userStore = useUserStore();
const props = defineProps({
  image: String,
  userImage: String,
  title: String,
  username: String,
  id: Number,
  isDisable: Boolean,
});

const images = {
  dark_ticket,
  light_ticket,
};
const selectedImage = computed(() => images[props.image]);
</script>

<style scoped></style>
