<template>
  <div class="pt-4">
    <Hero
      title="Для участвуя в розыгрыше выполните все условия:"
      :image="userStore.colorScheme === 'light' ? 'light_paper' : 'dark_paper'"
    />
    <div class="conditions flex flex-col gap-2 mt-4">
      <ConditionCard
        title="Ставки на сумму 1000 тенге в игре Lemon"
        :image="
          userStore.colorScheme === 'light' ? 'light_money' : 'dark_money'
        "
        :isDisable="false"
      />
      <ConditionCard
        title="Подписка вашего друга в телеграм канале"
        :image="
          userStore.colorScheme === 'light' ? 'light_telegram' : 'dark_telegram'
        "
        :isDisable="true"
      />
      <ConditionCard
        title="Подтвердил номер телефона"
        :image="
          !userStore.colorScheme === 'light' ? 'light_phone' : 'dark_phone'
        "
        :isDisable="false"
      />
    </div>
    <div class="grid grid-cols-2 gap-2 mt-3">
      <ButtonRoute link="checking" colorScheme="orange" title="Проверить еще раз" />
      <Button
          colorScheme="orange"
          title="Вернусь позже"
      />
  </div>
  </div>
</template>

<script setup>
import Hero from "@/components/Hero/Hero.vue";
import { useUserStore } from "@/stores/useUserStore.js";
import ConditionCard from "@/components/Condition/ConditionCard.vue";
import Button from "@/components/Button/Button.vue";
import ButtonRoute from "@/components/Button/ButtonRoute.vue";

const userStore = useUserStore();
</script>

<style scoped></style>
