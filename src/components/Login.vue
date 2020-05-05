<template>
  <v-container>
    <section id="firebaseui-auth-container"></section>
    <v-form @submit.prevent="onSignin">
      <v-text-field
        name="email"
        label="Mail"
        id="email"
        v-model="email"
        type="email"
        required></v-text-field>
      <v-text-field
        name="password"
        label="Password"
        :rules="passwordRules"
        id="password"
        v-model="password"
        type="password"
        required></v-text-field>
      <v-btn color="success" type="submit">Sign in</v-btn>
      <v-btn class="ml-2" to="/signin/register">or Register</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import * as firebase from "firebase";
import * as firebaseui from 'firebaseui'
import "firebaseui/dist/firebaseui.css";
import { db, auth } from '@/helpers/firebaseConfig'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be at least 6 characters',
      ],
    }
  },
  computed: {
    ...mapGetters([
      'getUser'
    ])
  },
  
  methods: {
    onSignin () {
      this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
    }
  },
  mounted() {
    var uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult(authResult){
          Vue.$toast.open({
            message: `Hello, ${authResult.user.displayName}!`,
            position: 'bottom',
            type: 'success',
            dismissible: true
          });
          let docRef = db.collection('users').doc(authResult.user.uid);
          docRef.get().then(function(doc){
            if (doc.exists) {
              db.collection('users').doc(authResult.user.uid).update({
                lastSignIn: authResult.user.metadata.lastSignInTime
              })
            }else {
              db.collection('users').doc(authResult.user.uid).set({
                name: authResult.user.displayName,
                id: authResult.user.uid,
                photoUrl: authResult.user.photoURL,
                accountCreated: authResult.user.metadata.creationTime,
                lastSignIn: authResult.user.metadata.lastSignInTime,
              })
            }
          })
        }
      },
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ]
    };
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
    ui = new firebaseui.auth.AuthUI(auth);
    }
    ui.start("#firebaseui-auth-container", uiConfig);
  }
}
</script>

<style>
  .firebaseui-card-content {
    padding: 0;
  }
  .firebaseui-idp-list {
    padding-inline-start: 0;
    padding-left: 0 !important;
  }
</style>