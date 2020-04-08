<template>
  <v-container>
    <v-card
      v-if="getUser"
      >
        <v-img :src="getUser.photoURL" alt=""></v-img>
        <v-card-title>{{ getUser.displayName }}</v-card-title>
        <v-card-subtitle>{{ getUser.email }}</v-card-subtitle>

      </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import firebase from 'firebase';
export default {
  name: 'Profile',
  data() {
    return {
      user: null
    };
  },
  computed: {
    ...mapGetters([
      'getUser'
    ])
  },
  methods: {
    logOut() {
      firebase.auth().signOut();
    }
  }
};
</script>

<style>
</style>