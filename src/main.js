import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Assuming you have a router setup
import store from './store';

createApp(App).use(store).use(router).mount('#app');
