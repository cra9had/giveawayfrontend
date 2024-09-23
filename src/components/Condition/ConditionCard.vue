<template>
  <div
    :class="[
      'flex justify-between  items-center p-2 gap-2 rounded-[4px] cursor-pointer',
      userStore.colorScheme === 'light' ? 'bg-white' : 'bg-[#32334B]',
      isDisable ? 'opacity-60' : 'opacity-100',
    ]"
  >
    <div class="flex items-center gap-2">
      <img
        :src="selectedImage"
        draggable="false"
        alt=""
        class="w-[40px] h-[40px]"
      />
      <div class="flex flex-col justify-center gap-1">
        <p
          :class="[
            'text-[14px]  min-w-[200px] leading-[16px] font-medium font-gilroy',
            userStore.colorScheme === 'light'
              ? 'text-[#737E87]'
              : 'text-[#B0B3C5]',
          ]"
          v-html="title"
        />
      </div>
    </div>
    <img
      :src="isDisable ? uncheck : check"
      alt=""
      class="w-[20px] h-[20px] mr-4"
    />
  </div>
</template>

<script setup>
import check from "@/assets/icons/condition/smCheck.svg";
import uncheck from "@/assets/icons/condition/smUncheck.svg";
import dark_money from "@/assets/icons/condition/dark_money.svg";
import dark_telegram from "@/assets/icons/condition/dark_telegram.svg";
import dark_phone from "@/assets/icons/condition/dark_phone.svg";
import light_money from "@/assets/icons/condition/light_money.svg";
import light_telegram from "@/assets/icons/condition/light_telegram.svg";
import light_phone from "@/assets/icons/condition/light_phone.svg";
import { computed } from "vue";
import { useUserStore } from "@/stores/useUserStore.js";

const userStore = useUserStore();
const props = defineProps({
  image: String,
  title: String,
  isDisable: Boolean,
});

const images = {
  light_phone,
  light_money,
  light_telegram,
  dark_phone,
  dark_money,
  dark_telegram,
};
const selectedImage = computed(() => images[props.image]);
</script>

<style scoped></style>
