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
          {{giveaway.description}}
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
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/useUserStore.js";
const userStore = useUserStore();
const giveaway = userStore.giveaway
const emit = defineEmits(["close"]);
const closeDialog = () => {
  emit("close");
};
const parameters = ref([
  `Участников: ${giveaway.total_participants}`,
  `Призовых мест: ${giveaway.winners_count}`,
  `Дата розыгрыша: <b>${giveaway.end_datetime}</b>`,
]);
</script>
<style></style>
