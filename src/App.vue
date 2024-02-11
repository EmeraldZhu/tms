<script setup>
import { ref, computed } from 'vue' // Make sure to import `computed` here
import { useStore } from 'vuex'
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

const store = useStore()
const currentUser = computed(() => store.getters.currentUser)
</script>

<template>
  <header class="header">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav class="nav">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>

        <span v-if="!store.getters.currentUser">
          <RouterLink to="/login">Login</RouterLink>
        </span>
        <span v-if="store.getters.currentUser">
          <RouterLink to="/profile">Profile</RouterLink>
        </span>
      </nav>
    </div>
  </header>

  <RouterView />

  <footer v-if="user"></footer>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #007BFF;
  color: white;
}

.logo {
  width: 50px;
  height: 50px;
}

.wrapper {
  display: flex;
  align-items: center;
}

.nav {
  display: flex;
  gap: 20px;
  margin-left: 20px;
}

.nav a {
  color: white;
  text-decoration: none;
}

.nav a:hover {
  text-decoration: underline;
}
</style>
