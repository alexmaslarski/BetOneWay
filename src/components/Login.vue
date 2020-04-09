<template>
  <v-container>
    <section id="firebaseui-auth-container"></section>
  </v-container>
</template>

<script>
import * as firebase from "firebase";
import * as firebaseui from 'firebaseui'
import "firebaseui/dist/firebaseui.css";

export default {
  name: 'Login',
  mounted() {
    var uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult(authResult){
          console.log(authResult);
          

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
    ui = new firebaseui.auth.AuthUI(firebase.auth());
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