import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase'
import LoginPage from '../views/auth/LoginPage.vue' // Import from views folder
import Register from '../views/auth/Register.vue'
import LandlordDashboard from '../views/landlord/Dashboard.vue'
import TenantDashboard from '../views/tenant/Dashboard.vue'

// protected route
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    // redirect root path to login page
    path: '/',
    redirect: '/login'
  },
  {
    // route for login page
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    // route for register page
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    // route for landlord dashboard
    // requires auth
    path: '/landlord-dashboard',
    name: 'LandlordDashboard',
    component: LandlordDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/tenant-dashboard',
    name: 'TenantDashboard',
    component: TenantDashboard,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  // use html5 history mode
  history: createWebHistory(import.meta.env.BASE_URL),
  // add routes to router
  routes
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
