<template>
    <aside class="navigation-panel">
      <section class="logo-section">
        <!-- Insert your logo here, or simply use text for the name of the system -->
        <h1>4J Gardens</h1>
      </section>
      <nav>
        <ul>
          <li v-for="item in navigationItems" :key="item.label" :class="{ active: item.path === $route.path }">
            <router-link :to="item.path">
              <img :src="item.icon" alt="" class="icon">
              <span class="label">{{ item.label }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>
  </template>
  
  <script>
  import HomeIcon from '@/assets/home-icon.svg';
  import DashboardIcon from '@/assets/dashboard-icon.svg';
  import PropertiesIcon from '@/assets/properties-icon.svg';

  export default {
    name: 'NavigationPanel',
    data() {
      return {
        navigationItems: [
          // These items will be dynamically generated based on user role
          // This is sample data for demonstration purposes
          { icon: HomeIcon, label: 'Home', path: '/home' },
          { icon: DashboardIcon, label: 'Dashboard', path: '/dashboard' },
          { icon: PropertiesIcon, label: 'Properties', path: '/properties' },
          // ... other navigation items
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .navigation-panel {
    width: 200px;
    min-height: 100vh;
    background-color: #333;
    color: white;
  }
  
  .logo-section {
    padding: 1rem;
    text-align: center;
    border-bottom: 1px solid #444;
    margin-bottom: 1rem;
  }
  
  .logo-section h1 {
    color: white;
    font-size: 1.5rem;
  }
  
  nav ul {
    list-style: none;
    padding: 0;
  }
  
  nav li {
    padding: 0.5rem 1rem;
  }
  
  nav li.active {
    background-color: #555;
  }
  
  nav .router-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;
  }
  
  nav .icon {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }
  
  nav .label {
    font-size: 1rem;
  }
  </style>
  