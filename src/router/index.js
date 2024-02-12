import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase'
import LoginPage from '../views/auth/LoginPage.vue' // Import from views folder
import Register from '../views/auth/Register.vue'

// protected route
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // redirect root to login page
    {
      path: '/',
      redirect: '/login'
    },
    // add login route
    {
      path: '/login',
      component: LoginPage
    },
    // add register router
    {
      path: '/register',
      component: () => import('../views/auth/Register.vue')
    },
    // protected route with requiresAuth flag
    {
      path: '/home',
      component: HomeView,
      meta: { requiresAuth: true } // flag for authentication check
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

// navigation guard to check authentication
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !auth.currentUser) {
    next('/login') // redirect to login if not authenticatrd
  } else {
    next();
  }
})

export default router
