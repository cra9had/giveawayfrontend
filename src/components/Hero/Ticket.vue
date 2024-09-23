<template>
  <component
      :is="link ? 'router-link' : 'div'"
      :to="link || undefined"
      :class="[
      'flex items-center px-2 py-2.5 rounded-[4px] cursor-pointer',
      userStore.colorScheme === 'light' ? 'bg-white' : 'bg-[#32334B]',
    ]"
  >
    <img :src="selectedImage" alt="" class="w-[40px] h-[40px] mr-4" />
    <div class="flex flex-col justify-center gap-1">
      <p class="font-bold text-[14px] leading-[17px]">
        {{ title }}
      </p>
      <p
          :class="[
          'text-[12px] leading-[14px] font-medium font-gilroy',
          userStore.colorScheme === 'light' ? 'text-[#737E87]' : 'text-[#B0B3C5]',
        ]"
          v-html="description"
      />
    </div>
  </component>
</template>

<script setup>
import ticket from "@/assets/icons/hero/ticket.svg";
import user from "@/assets/icons/hero/user.svg";
import { computed } from "vue";
import { useUserStore } from "@/stores/useUserStore.js";

const userStore = useUserStore();
const props = defineProps({
  image: String,
  title: String,
  description: String,
  link: String
});

const images = { user, ticket };
const selectedImage = computed(() => images[props.image]);
</script>

<style scoped></style>
