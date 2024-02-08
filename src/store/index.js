import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from '../firebase'
// import { firestore } from 'firebase/firestore'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        }
    },
    getters: {
        currentUser: state => {
            return auth.currentUser // retrieve from firebase auth
        }
    }
})