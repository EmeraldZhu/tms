import { createApp } from 'vue';
import { createStore } from 'vuex';
import { auth, db } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';

// Create a new store instance.
const store = createStore({
    state() {
        return {
            user: null,
            role: null, // new state for user role
        };
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setRole(state, role) { // new mutation for user role
            state.role = role;
        }
    },
    actions: {
        async fetchUserRole({ commit }, user) { // new action for fetching user role
            const docSnap = await getDoc(doc(db, 'users', user.uid));

            if (docSnap.exists()) {
                commit('setRole', docSnap.data().role);
            } else {
                console.log('No such document!');
            }
        },
    },
    getters: {
        currentUser: state => {
            return auth.currentUser; // retrieve from firebase auth
        }
    }
});

export default store;
