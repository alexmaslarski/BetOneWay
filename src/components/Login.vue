<template>
  <div class="login">
        <section id="firebaseui-auth-container"></section>
        <p>BetOneWay uses Firebase as an authentication provider. This helps us make sure that your personal information is well protected and in good hands</p>
  </div>
</template>

<script>
import * as firebase from "firebase";
import * as firebaseui from 'firebaseui'
import "firebaseui/dist/firebaseui.css";

export default {
  name: 'Login',
  mounted() {
    var uiConfig = {
      signInSuccessUrl: "/profile",
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

</style>