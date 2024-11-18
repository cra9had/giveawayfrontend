<template>
  <div class="flex flex-col h-full">
    <div class="flex  p-4 pb-16 flex-col gap-2">
      <Hero
        title="Вы не выполнили условия розыгрыша!"
        image="error"
        description="Для розыгрыша выполните все условия"
      />
      <Counter text="До завершения" class="" />
      <div class="flex items-center justify-center">
      <Button colorScheme="light" title="Подробнее о розыгрыше" />
      </div>
      <div class="conditions flex flex-col gap-2 mt-4">
        <ToDoConditionCard
          :title="`Ставки на сумму ${giveaway.terms_of_participation.bet.sum} тенге`"
          :image="
            userStore.colorScheme === 'light' ? 'light_money' : 'dark_money'
          "
          :isDisable="false"
          badgeText="Выполнить"
          v-if="giveaway.terms_of_participation.bet.required && conditions.errors.includes('bet')"
        />
        <ToDoConditionCard3
            :title="`Ставки на сумму ${giveaway.terms_of_participation.bet.sum} тенге`"
            :image="
            userStore.colorScheme === 'light' ? 'light_money' : 'dark_money'
          "
            :isDisable="false"
            badgeText="Выполнить"
            v-else-if="giveaway.terms_of_participation.bet.required"
        />
        <ToDoConditionCard
            :title="`Депозит на сумму ${giveaway.terms_of_participation.deposit.sum} тенге`"
            :image="
            userStore.colorScheme === 'light' ? 'light_money' : 'dark_money'
          "
            :isDisable="false"
            badgeText="Выполнить"
            v-if="giveaway.terms_of_participation.deposit.required && conditions.errors.includes('deposit')"
        />
        <ToDoConditionCard3
            :title="`Депозит на сумму ${giveaway.terms_of_participation.deposit.sum} тенге`"
            :image="
            userStore.colorScheme === 'light' ? 'light_money' : 'dark_money'
          "
            :isDisable="false"
            badgeText="Выполнить"
            v-else-if="giveaway.terms_of_participation.deposit.required"
        />
        <ToDoConditionCard
          title="Подтвердил электронную почту"
          :image="
            userStore.colorScheme === 'light'
              ? 'light_telegram'
              : 'dark_telegram'
          "
          :isDisable="true"
          badgeText="Выполнить"
          v-if="giveaway.terms_of_participation.confirm_email_required && conditions.errors.includes('confirm_email_required')"
        />
        <ToDoConditionCard3
            title="Подтвердил электронную почту"
            :image="
            userStore.colorScheme === 'light'
              ? 'light_telegram'
              : 'dark_telegram'
          "
            :isDisable="true"
            badgeText="Выполнить"
            v-else-if="giveaway.terms_of_participation.confirm_email_required"
        />
        <ToDoConditionCard
          title="Подтвердил номер телефона"
          :image="
            userStore.colorScheme === 'light' ? 'light_phone' : 'dark_phone'
          "
          :isDisable="false"
          badgeText="Выполнить"
          v-if="giveaway.terms_of_participation.confirm_phone_required && conditions.errors.includes('confirm_phone_required')"
        />
        <ToDoConditionCard3
            title="Подтвердил номер телефона"
            :image="
            userStore.colorScheme === 'light' ? 'light_phone' : 'dark_phone'
          "
            :isDisable="false"
            badgeText="Выполнить"
            v-else-if="giveaway.terms_of_participation.confirm_phone_required"
        />
      </div>
      <div class="grid grid-cols-1 gap-2 mt-3">
        <Button colorScheme="orange" title="Проверить условия"
        @click="checkConditions()"/>
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
import ToDoConditionCard3 from "@/components/Condition/ToDoConditionCard3.vue";
import { computed } from "vue";


const userStore = useUserStore();
const router = useRouter();
const conditions = computed(() => userStore.conditions);
const giveaway = computed(() => userStore.giveaway);

const bot_username = ref("lotoclubdevbot");
const inviteLink = `https://t.me/share/url?url=https://t.me/${bot_username.value}&text=Join%20this%20awesome%20bot%20and%20get%20extra%20tickets!`;

const webapp = window.Telegram.WebApp;

function checkConditions() {

  this.router.push(
      {
        name: "checking",
        params: {
          id: this.giveaway.id
        }
      }
  )
}

onMounted(() => {
  console.log(conditions);
  console.log(giveaway);
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
