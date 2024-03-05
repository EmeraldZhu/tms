import { createRouter, createWebHistory } from 'vue-router'
import { auth, db } from '../firebase'
import { useStore } from 'vuex'
import LoginPage from '../views/auth/LoginPage.vue'
import Register from '../views/auth/Register.vue'
import DashboardWrapper from '@/components/DashboardWrapper.vue';
import LandlordDashboard from '../views/landlord/Dashboard.vue';
import InviteForm from '@/views/landlord/InviteForm.vue';
import TenantDashboard from '../views/tenant/Dashboard.vue';
import InviteeRegister from '../views/auth/InviteeRegister.vue';

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
  {
    path: '/dashboard',
    component: DashboardWrapper,
    children: [
      {
        path: 'landlord',
        name: 'LandlordDashboard',
        component: LandlordDashboard,
        meta: { requiresAuth: true, },
        children: [
          {
            path: 'invites',
            name: 'InviteForm',
            component: InviteForm,
            meta: { requiresAuth: true, requiresRole: 'landlord' },
          }
        ]
      },
      {
        path: 'tenant',
        name: 'TenantDashboard',
        component: TenantDashboard,
        meta: { requiresAuth: true, role: 'tenant' },
      }
    ]
  },
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
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiredRole = to.matched.some(record => record.meta.requiresRole) ? to.matched.find(record => record.meta.requiresRole).meta.requiresRole : null;
  const store = useStore();

  if (requiresAuth && !auth.currentUser) {
    next('/login'); // Redirect to login if not authenticated
  } else if (requiresAuth && auth.currentUser && requiredRole) {
    // Fetch user role from Vuex store
    // Note: Ensure the user's role is being fetched/set during the authentication process
    const userRole = store.state.role;
    
    if (userRole === requiredRole) {
      next(); // User has the required role, proceed
    } else {
      next(from.path); // Redirect to previous page or a default page if user doesn't have required role
    }
  } else {
    next(); // Proceed if no specific role is required
  }
});


// export router instance
export default router
