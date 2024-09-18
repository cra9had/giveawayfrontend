import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import Vue3Lottie from 'vue3-lottie';
import { createPinia } from 'pinia';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
    components,
    directives,
});

const app = createApp(App);
app.use(router);
app.use(Vue3Lottie);
app.use(createPinia());
app.use(vuetify);
app.mount('#app');
