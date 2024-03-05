<template>
    <div class="dashboard-wrapper">
      <NavPanel />
      <main class="dashboard-content">
        <!-- router-view will display the component based on the route -->
        <router-view />
      </main>
    </div>
  </template>
  
  <script>
  import NavPanel from '@/components/NavPanel.vue'; // Ensure the path is correct based on your project structure
  
  export default {
    name: 'DashboardWrapper',
    components: {
      NavPanel,
    },
  };
  </script>
  
  <style scoped>
  .dashboard-wrapper {
    display: flex;
    min-height: 100vh;
    background-color: #f5f5f5;
  }
  
  .dashboard-content {
    flex-grow: 1;
    padding: 2rem; /* Adjust padding as needed */
    overflow-y: auto; /* Scrollable content */
  }
  
  /* Responsive Design: Adjust the layout for smaller screens */
  @media (max-width: 768px) {
    .dashboard-wrapper {
      flex-direction: column;
    }
    .dashboard-content {
      padding: 1rem;
    }
  }
  </style>
  