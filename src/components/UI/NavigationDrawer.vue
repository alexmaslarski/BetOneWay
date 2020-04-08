<template>
  <v-list
  dense
  nav
  class="py-0"
  >
    <v-list-item
    two-line
    >
    <v-list-item-avatar>
      <img :src="user.photoURL" alt="">
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{user.displayName}}</v-list-item-title>
      <v-list-item-subtitle to="/profile" >Profile</v-list-item-subtitle>
    </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
  </v-list>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      user: null
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      }
    });
  }
}
</script>

<style>

</style>