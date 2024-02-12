import { createRouter, createWebHistory } from 'vue-router'
import { auth, db } from '../firebase'
import { useStore } from 'vuex'
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

// create router instance
const router = createRouter({
  // use html5 history mode
  history: createWebHistory(import.meta.env.BASE_URL),
  // add routes to router
  routes
})

// navigation guard to check authentication
router.beforeEach(async (to, from, next) => {
  // check if route requires auth
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  // if route requires auth & user is authenticated
  if (requiresAuth && auth.currentUser) {
    const store = useStore(); // access Vuex Store
    await store.dispatch('fetchUserRole', auth.currentUser); // fetch user role

    // redirect user based on role
    if (store.state.role === 'landlord') {
      next('/landlord-dashboard');
    } else if (store.state.role === 'tenant') {
      next('/tenant-dashboard');
    }
  } else if (requiresAuth && !auth.currentUser) {
      next('/login') // redirect to login if not authenticatrd
  } else {
    // otherwise, continue to requested route
    next();
  }
})

// export router instance
export default router
