<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Argon"
      title="Argon"
    >
      <template slot="links">

        <sidebar-item
          :link="{
            name: 'Billboards',
            icon: 'fas fa-desktop text-grey',
            path: '/dashboard'
          }"
        />

        

        <sidebar-item :link="{name: 'Advertisements', icon: 'fas fa-tag text-grey', path: '/icons'}"/>
        <sidebar-item :link="{name: 'Your Profile', icon: 'fas fa-user-circle text-grey', path: '/profile'}"/>
        
        <!--
        <sidebar-item :link="{name: 'Market Insights', icon: 'fas fa-signal text-grey', path: '/tables'}"/>
        <sidebar-item :link="{name: 'Register', icon: 'ni ni-circle-08 text-pink', path: '/register'}"/>
        <sidebar-item :link="{name: 'Login', icon: 'ni ni-key-25 text-info', path: '/login'}"/> 
        <sidebar-item :link="{name: 'Your Profile', icon: 'fas fa-user-circle text-grey', path: '/profile'}"/>

        -->

        

      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      FadeTransition
    },
    data() {
      return {
        sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
      };
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>
<style lang="scss">
</style>
