<template>
  <v-container>
      <v-card-subtitle class="px-0 pt-0"><app-back></app-back></v-card-subtitle>
      <v-card-title>New Post</v-card-title>
      <v-textarea v-model="text"></v-textarea>
      <v-btn block x-large @click="createPost" color="primary darken-1" class="mb-12">Create Post</v-btn>
  </v-container>
</template>

<script>
// Single post page
export default {
  name: 'CreatePost',
  data() {
    return {
      text: ''
    }
  },
  methods: {
    createPost: function(){
      this.$store.dispatch('createPost', this.text)
      this.text = '';
    },
  }
}
</script>

<style>

</style>