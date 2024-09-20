<template>
  <div className="flex flex-col h-full">
    <div className="flex p-4 pb-16 flex-col gap-2">
      <Hero
        title="Вы не выполнили условия розыгрыша!"
        image="error"
        description="Для розыгрыша выполните все условия"
      />
      <Counter time="06:01:52" text="До завершения" class="" />
      <Button colorScheme="light" title="Подробнее о розыгрыше" />
      <div className="conditions flex flex-col gap-2 mt-4">
        <ToDoConditionCard
          title="Ставки на сумму 1000 тенге в игре Lemon"
          :image="
            userStore.colorScheme === 'light' ? 'light_money' : 'dark_money'
          "
          :isDisable="false"
          badgeText="Выполнить"
        />
        <ToDoConditionCard
          title="Подписка вашего друга в телеграм канале"
          :image="
            userStore.colorScheme === 'light'
              ? 'light_telegram'
              : 'dark_telegram'
          "
          :isDisable="true"
          badgeText="Выполнить"
        />
        <ToDoConditionCard
          title="Подтвердил номер телефона"
          :image="
            userStore.colorScheme === 'light' ? 'light_phone' : 'dark_phone'
          "
          :isDisable="false"
          badgeText="Выполнить"
        />
      </div>
      <div class="grid grid-cols-1 gap-2 mt-3">
        <ButtonTimer
          colorScheme="light"
          title="Проверить условия"
          timer="00:59"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Hero from "@/components/Hero/Hero.vue";
import { useUserStore } from "@/stores/useUserStore.js";
import Button from "@/components/Button/Button.vue";
import Counter from "@/components/Counter/Counter.vue";
import ToDoConditionCard from "@/components/Condition/ToDoConditionCard.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import ButtonTimer from "@/components/Button/ButtonTimer.vue";

const userStore = useUserStore();
const router = useRouter();

const bot_username = ref("lotoclubdevbot");
const inviteLink = `https://t.me/share/url?url=https://t.me/${bot_username.value}&text=Join%20this%20awesome%20bot%20and%20get%20extra%20tickets!`;

const webapp = window.Telegram.WebApp;

onMounted(() => {
  webapp.MainButton.setText("Отправить в Телеграм");
  webapp.MainButton.setParams({
    color: "#F45A0E",
    position: "bottom",
    size: "full",
  });
  webapp.MainButton.show();
  webapp.MainButton.onClick(() => {
    window.open(inviteLink, "_blank");
  });

  webapp.BackButton.show();
  webapp.BackButton.onClick(() => {
    router.go(-1);
  });
});
</script>

<style scoped></style>
