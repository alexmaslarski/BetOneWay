<template>
<div class="nav-drawer">
  <v-list
  dense
  nav
  class="py-0"
  >
    <v-list-item
    two-line
    to="/profile"
    >
    <v-list-item-avatar>
      <img :src="getUser.photoURL" alt="">
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{getUser.displayName}}</v-list-item-title>
      <v-list-item-subtitle>Profile</v-list-item-subtitle>
    </v-list-item-content>
    </v-list-item>
  </v-list>
  <v-divider></v-divider>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      user: null
    }
  },
  computed: {
    ...mapGetters([
      'getUser'
    ])
  }
}
</script>

<style>

</style>