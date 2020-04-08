<template>
  <div class="card horizontal" style="max-width:400px;margin:0 auto;" v-if="getUser">
    <div class="card-image" style="margin-top:25px;margin-left:10px;">
      <img
        :src="getUser.photoURL"
        style="width:75px;height:75px;border-radius:50%;border:4px solid #333"
      />
    </div>
    <div class="card-stacked">
      <div class="card-content">
        <p>
          name:
          <strong>{{getUser.displayName}}</strong>
          <br />email:
          <strong>{{getUser.email}}</strong>
          <br />uid:
          <strong>{{getUser.uid}}</strong>
          <br />provider:
          <strong class="teal-text">{{getUser.providerData[0].providerId}}</strong>
        </p>
      </div>
    </div>
    <button @click='logOut' >Log Out</button>
  </div>
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