<template>
  <div class="pt-4">
    <Hero
      title="Проверяем выполнение условий"
      description="Не отписывайтесь от каналов до окончания розыгрыша!"
      :image="
        userStore.colorScheme === 'light' ? 'light_search' : 'dark_search'
      "
    />
  </div>
</template>

<script setup>
import Hero from "@/components/Hero/Hero.vue";
import { useUserStore } from "@/stores/useUserStore.js";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
});

const userStore = useUserStore();
const webapp = window.Telegram.WebApp;
const initDataUnsafe =  {
  "query_id": "AAFRCPZDAAAAAFEI9kP97ZBf",
  "user": {
    "id": 1140197457,
    "first_name": "Khaiam",
    "last_name": "",
    "username": "khaiam_aliev",
    "language_code": "ru",
    "is_premium": true,
    "allows_write_to_pm": true
  },
  "auth_date": "1728301999",
  "hash": "a03e5b3dc5ebc4843e54cd19057d2c722a4456e7319b766def6d87a46988eca2"
}
alert(JSON.stringify(webapp.initDataUnsafe.user))

const router = useRouter();
const isLoading = ref(true);
const error = ref(null);
const apiUrl = import.meta.env.VITE_API_URL;

const authorizeUser = async () => {
  try {
    const response = await fetch( apiUrl + "/api/auth/telegram/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(initDataUnsafe),
    });

    if (!response.ok) throw new Error('Authorization failed');

    const data = await response.json();
    localStorage.setItem('token', data.token);
    console.log(data);
  } catch (err) {
    console.error(err);
    error.value = err.message; // Set the error message
  } finally {
    isLoading.value = false; // Stop loading state
  }
};

const checkGiveaway = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await fetch(apiUrl + `/api/giveaways/${props.id}/`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`,
        'ngrok-skip-browser-warning': '69420',
      },
    });

    if (!response.ok) {
      console.log(`Error: ${response.status} - ${response.statusText}`);
      throw new Error('Giveaway check failed');
    }

    const data = await response.json(); // Ensure the response is JSON
    console.log(data)
    return data
  } catch (err) {
    console.log(err.message);
    error.value = err.message; // Set the error message
  }
};


const getTicket = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await fetch(apiUrl + `/api/tickets/join/${props.id}/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'ngrok-skip-browser-warning': '69420',
      },
    });

    if (!response.ok) {
      console.log(`Error: ${response.status} - ${response.statusText}`);
      throw new Error('Giveaway check failed');
    }

    const data = await response.json(); // Ensure the response is JSON
    console.log(data);
    return data
  } catch (err) {
    console.log(err.message);
    error.value = err.message; // Set the error message
  }
};



onMounted(() => {
  webapp.BackButton.show();
  webapp.BackButton.onClick(() => {
    router.go(-1);
  });
  webapp.MainButton.hide();
  webapp.MainButton.isVisible = false;

  const init = async () => {
    await authorizeUser();
    const giveaway = await checkGiveaway();
    userStore.setGiveaway(giveaway);
    if (!giveaway.already_joined && giveaway.status === 'in_progress') {
      const conditions = await getTicket();
      if (conditions.status === false) {
        userStore.setConditions(conditions); // обновление conditions
        await router.push({
          name: 'todo-condition',  // Имя вашего целевого маршрута
        });
      }
    } else if (giveaway.already_joined && giveaway.status === 'end') {
        if (giveaway.is_winner) {
          await router.push({
            name: 'winners2',
          })
        } else {
          await router.push({
            name: 'winners',
          })
        }
    }
  };

  // Call the async function
  init();
});
</script>

<style scoped>
/* Add any additional styles here */
</style>
