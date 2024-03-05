import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Assuming you have a router setup
import store from './store';
import NavPanel from '@/components/NavPanel.vue';

const app = createApp(App);
// createApp(App).use(store).use(router).mount('#app');

app.component('NavPanel', NavPanel);

app.use(store);
app.use(router);

app.mount('#app');
