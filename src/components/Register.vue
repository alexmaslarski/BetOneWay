<template>
  <v-container>
      <v-form @submit.prevent="onSignup">
        <v-text-field
          name="email"
          label="Mail"
          id="email"
          v-model="email"
          type="email"
          required></v-text-field>
        <v-text-field
          name="password"
          :rules="passwordRules"
          label="Password"
          id="password"
          v-model="password"
          type="password"
          required></v-text-field>
        <v-text-field
          name="confirmPassword"
          label="Confirm Password"
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          :rules="[comparePasswords]"></v-text-field>
        <v-btn color="success" type="submit">Sign up</v-btn>
        <v-btn class="ml-2" to="/signin/login">or Log In</v-btn>
      </v-form>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be at least 6 characters',
      ],
      }
    },
    computed: {
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
      },
      user () {
        return this.$store.getters.getUser
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      onSignup () {
        this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
      }
    }
  }
</script>
