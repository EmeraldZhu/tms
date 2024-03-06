import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { getAuth, onAuthStateChanged, setPersistence, browserSessionPersistence } from 'firebase/auth';
import store from './store';

import NavPanel from '@/components/NavPanel.vue';

const app = createApp(App);

app.component('NavPanel', NavPanel);

app.use(store);
app.use(router);

const auth = getAuth();

// Set the authentication state persistence
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Persistence is set, you can now listen for authentication state changes
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
    });
  })
  .catch((error) => {
    console.error('Error setting authentication state persistence:', error);
  });

app.mount('#app');