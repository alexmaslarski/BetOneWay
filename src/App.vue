<template>
  <v-app>

    <!-- Top bar -->
    <v-app-bar
      app
      color="primary"
      elevate-on-scroll
      dark
      clipped-left
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

        <!-- Nav drawer -->
    <v-navigation-drawer
    app
    v-model="drawer"
    clipped
    >
    <app-nav-drawer-content></app-nav-drawer-content>
      <app-login></app-login>
    </v-navigation-drawer>

    <!-- Content -->
    <v-content>
      <router-view></router-view>
    </v-content>

    <!-- Bottom nav -->
    <v-bottom-navigation
    app
    >
    <v-btn to="/profile" value="profile">
      <span>Profile</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>

    <v-btn to="/" value="Home">
      <span>Home</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn to="/login" value="login">
      <span>Login</span>
      <v-icon>mdi-login</v-icon>
    </v-btn>
  </v-bottom-navigation>
  </v-app>
</template>

<script>
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
      drawer: false,
      user: null
    }
  },
  mounted () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      }
    });
  }
};
</script>
