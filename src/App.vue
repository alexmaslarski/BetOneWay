<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      absolute
      elevate-on-scroll
      dark
    >

      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container
      :fluid="true"
      >
      <router-view></router-view>
      </v-container>
    </v-content>
    <v-bottom-navigation
    app
    >
    <v-btn to="/profile" value="profile">
      <span>Profile</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>

    <v-btn to="/" value="favorites">
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
export default {
  name: 'App',
  data () {
    return {
    }
  }
};
</script>
