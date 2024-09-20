<template>
  <div
    :class="[
      'flex justify-start  items-center p-2 gap-2 rounded-[4px] cursor-pointer',
      userStore.colorScheme === 'light' ? 'bg-white' : 'bg-[#32334B]',
    ]"
  >
    <img
      :src="selectedImage"
      draggable="false"
      alt=""
      class="w-[40px] h-[40px]"
    />
    <div class="flex flex-col justify-center items-start gap-1">
      <p
        :class="[
          'text-[14px]   leading-[16px] font-medium font-gilroy',
          userStore.colorScheme === 'light'
            ? 'text-[#737E87]'
            : 'text-[#B0B3C5]',
        ]"
        v-html="title"
      />
      <div
        class="text-[12px] rounded-[50px] w-[73px] flex items-center justify-center h-[20px] bg-orange_color text-white leading-[14px] font-bold font-gilroy',"
      >
        {{ badgeText }}
      </div>
    </div>

  </div>
</template>

<script setup>
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
  badgeText: String,
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
