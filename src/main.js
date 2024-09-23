import { createApp } from 'vue';
import './assets/styles/style.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount('#app');
if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', () => {
        document.body.style.height = window.visualViewport.height + 'px';
    });
}
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) window.scrollTo(0, 0);
});