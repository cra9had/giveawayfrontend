<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/useUserStore";
import Button from "../../components/Button/Button.vue";
import Qr from "../../components/Verification/Qr.vue";
import OTP from "../../components/Verification/OTP.vue";
import SecondPageTV from "../../components/Verification/SecondPageTV.vue";
import getOS from "../../utils/getOS.js";
import TheError from "../404/Index.vue";
const userStore = useUserStore();
const router = useRouter();
const webapp = window.Telegram.WebApp;
const loading = ref(true);
const currentStep = ref(1); // 0: Qr, 1: OTP, 2: SecondPageTV
const steps = [
  { component: Qr, text: "Запуск бота" },
  { component: OTP, text: "Ввод кода" },
  { component: SecondPageTV, text: "Настройка VPN" },
];
const os = ref(null);
const url = import.meta.env.VITE_APP_BASE_URL;
const screenResolution = ref(window.innerWidth);

function updateScreenResolution() {
  screenResolution.value = window.innerWidth;
}

const subscribe_url = ref("");
onMounted(async () => {
  document.body.classList.add("bg_dark");
  window.addEventListener("resize", updateScreenResolution);
  os.value = getOS();
  loading.value = false;
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateScreenResolution);
});

const handleOtpConfirmed = () => {
  setTimeout(() => {
    nextStep();
  }, 500);
};
const changeSubscribe = (url) => {
  subscribe_url.value = url;
};

const prevStep = () => {
  currentStep.value = 0;
};
const nextStep = () => {
  if (currentStep.value === 0) {
  }

  if (currentStep.value < steps.length - 1) {
    currentStep.value += 1;
  }
};

const isButtonVisible = computed(() => currentStep.value < steps.length - 2);
</script>

<template>
  <transition name="fade">
    <div v-if="!loading">
      <div
        v-if="screenResolution >= 720"
        class="flex m-0-auto flex-col justify-center items-center h-[90vh] gap-2"
      >
        <transition name="slide-fade">
          <template v-if="!loading">
            <component
              :is="steps[currentStep].component"
              :verifyCode="verify_code"
              :url="url"
              @otpConfirmed="handleOtpConfirmed"
              @subScribeUrl="changeSubscribe"
              @goBack="prevStep"
              :subscribeUrl="subscribe_url"
            />
          </template>
        </transition>
        <div
          v-if="isButtonVisible"
          class="fixed site_button justify-center bottom-[120px] verification_button_parent left-4 right-4 flex items-center gap-3"
        >
          <Button
            @click="nextStep"
            colorScheme="dark_blue"
            title="Следующий шаг"
            id="next_btn"
          />
        </div>

        <div class="fixed bottom-10 verification_slide_parent">
          <div class="slide_bullets transition">
            <div
              v-for="(step, index) in steps"
              :key="index"
              class="bullet transition-min-width smooth cursor-pointer"
              :class="[
                index === currentStep ? 'active_bullet' : '',
                userStore.colorScheme === 'light' && index === currentStep
                  ? 'active_bullet_light'
                  : '',
                userStore.colorScheme === 'dark' && index === currentStep
                  ? 'active_bullet_dark'
                  : '',
              ]"
            >
              <span v-if="index === currentStep">{{ step.text }}</span>
            </div>
          </div>
        </div>
      </div>
      <TheError
        v-else
        title="Ошибка!"
        description="Сайт откроется </br> только на телевизоре"
      />
    </div>
  </transition>
</template>

<style>
.bg_dark {
  background: #000 !important;
  color: white;
}
.verification {
  height: 80vh;
  overflow-y: scroll;
}
.slide_bullets {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}
.bullet {
  min-width: 30px;
  min-height: 30px;
  background: #27272a;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

.active_bullet {
  background: #8e8e94;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: min-content;
  font-size: 24px;
  border-radius: 50px;
  color: white;
  padding: 0 18px;
  transition: all 0.3s linear;
  min-height: 49px;
}
</style>
