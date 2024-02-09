import { createApp } from 'vue';
import { createStore } from 'vuex';
import { auth } from '../firebase';

// Create a new store instance.
const store = createStore({
    state() {
        return {
            user: null
        };
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        }
    },
    getters: {
        currentUser: state => {
            return auth.currentUser; // retrieve from firebase auth
        }
    }
});

export default store;
