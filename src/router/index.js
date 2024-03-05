import { createRouter, createWebHistory } from 'vue-router'
import { auth, db } from '../firebase'
import { useStore } from 'vuex'
import LoginPage from '../views/auth/LoginPage.vue'
import Register from '../views/auth/Register.vue'
import DashboardWrapper from '@/components/DashboardWrapper.vue';
import LandlordDashboard from '../views/landlord/Dashboard.vue'
import TenantDashboard from '../views/tenant/Dashboard.vue'
import InviteeRegister from '../views/auth/InviteeRegister.vue'

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
    // route for invitee register page
    path: '/invitee-register',
    name: 'InviteeRegister',
    component: InviteeRegister
  },
  // {
  //   // route for landlord dashboard
  //   // requires auth
  //   path: '/landlord-dashboard',
  //   name: 'LandlordDashboard',
  //   component: LandlordDashboard,
  //   meta: { requiresAuth: true }
  // },
  // {
  //   path: '/tenant-dashboard',
  //   name: 'TenantDashboard',
  //   component: TenantDashboard,
  //   meta: { requiresAuth: true }
  // },
  {
    path: '/dashboard',
    component: DashboardWrapper,
    children: [
      {
        path: 'landlord',
        name: 'LandlordDashboard',
        component: LandlordDashboard,
        meta: { requiresAuth: true, role: 'landlord' },
      },
      {
        path: 'tenant',
        name: 'TenantDashboard',
        component: TenantDashboard,
        meta: { requiresAuth: true, role: 'tenant' },
      }
    ]
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
router.beforeEach((to, from, next) => {
  // check if route requires auth
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  // if route requires auth & user is authenticated
  if (requiresAuth && auth.currentUser) {
    const store = useStore(); // access Vuex Store
    // await store.dispatch('fetchUserRole', auth.currentUser);

    // redirect user based on role
    if (store.state.role === 'landlord' && to.path !== '/landlord-dashboard') {
      next('/landlord-dashboard');
    } else if (store.state.role === 'tenant' && to.path !== '/tenant-dashboard') {
      next('/tenant-dashboard');
    } else {
      next();
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
