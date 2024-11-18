import { createApp } from 'vue';
import './assets/styles/style.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const app = createApp(App);
app.use(router);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia)


app.config.globalProperties.$apiUrl = 'https://2738-2403-6200-8871-4f3e-2029-482f-130c-5520.ngrok-free.app';


app.mount('#app');

if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', () => {
        document.body.style.height = window.visualViewport.height + 'px';
    });
}
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) window.scrollTo(0, 0);
});