<template>
  <v-app>

    <!-- Top bar -->
    <v-app-bar
      app
      color="success"
      elevate-on-scroll
      dark
      clipped-right
    >
      <v-btn
      v-if="$route.path!='/'"
      icon
      @click="goBack"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{ $route.name }}</v-toolbar-title>

      <v-spacer></v-spacer>
      
      <v-btn
        icon
        @click="drawer = true"
        >
        <v-badge
        :content="getBetSlipCount"
        :value="getBetSlipCount > 0"
        color="orange"
      >
          <v-icon v-if="getUser">mdi-menu</v-icon>
          <v-icon v-else>mdi-login</v-icon>
        </v-badge>
      </v-btn>
      
        
    </v-app-bar>

        <!-- Nav drawer -->
    <v-navigation-drawer
    app
    v-model="drawer"
    clipped
    right
    >
    <app-nav-drawer-content v-if="getUser"></app-nav-drawer-content>
      
    <app-login v-else ></app-login>
      <template v-if="getUser" v-slot:append>
        <div class="pa-2">
          <v-btn @click='logOut' block>Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Content -->
    <v-content>
      <transition name="slide" mode="out-in">
      <router-view></router-view>
      </transition>
    </v-content>

    <!-- Bottom nav -->
    <v-bottom-navigation
    app
    >
    <v-btn to="/" value="Home">
      <span>Home</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>
  </v-bottom-navigation>
  </v-app>
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import firebase from "firebase";
import Login from './components/Login.vue'
import NavDrawer from './components/UI/NavigationDrawer.vue'
export default {
  name: 'App',
  components: {
    'app-login': Login,
    'app-nav-drawer-content': NavDrawer
  },
  data () {
    return {
      drawer: false
    }
  },
  mounted () {
    firebase.auth().onAuthStateChanged(user => {
      this.$store.dispatch('updateUser', user)
    });
  },
    computed: {
    ...mapGetters([
      'getUser',
      'getBetSlipCount'
    ])
  },
  methods: {
    logOut() {
      firebase.auth().signOut();
      Vue.$toast.open({
        message: 'Logged out',
        position: 'bottom',
        type: 'info',
        dismissible: true
      });
    },
    goBack() {
      return this.$router.go(-1);
    }
  }
};
</script>
<style>
.slide-enter {
      opacity: 0;
  }

  .slide-enter-active {
      animation: slide-in 0.5s ease-out forwards;
      transition: opacity .5s;
  }

  .slide-leave-active {
      animation: slide-out 0.5s ease-out forwards;
      transition: opacity 0.5s;
      opacity: 0;
      position: absolute;
  }

  .slide-move {
      transition: transform 0.5s;
  }

  @keyframes slide-in {
      from {
          transform: translateY(20px);
      }
      to {
          transform: translateY(0);
      }
  }

  @keyframes slide-out {
      from {
          transform: translateY(0);
      }
      to {
          transform: translateY(20px);
      }
  }
</style>