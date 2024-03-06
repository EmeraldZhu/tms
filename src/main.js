import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import store from './store';

import NavPanel from '@/components/NavPanel.vue';

const app = createApp(App);

app.component('NavPanel', NavPanel);

app.use(store);
app.use(router);

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (user) {
        store.commit('setUser', user);
        // fetch and store user role
        store.dispatch('fetchUserRole', user);
    } else {
        // user is signed out
        store.commit('setUser', null);
        store.commit('setRole', null);
    }
})

app.mount('#app');
