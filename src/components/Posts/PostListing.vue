<template>
  <v-skeleton-loader :loading="loading" type="card-heading, list-item@3">
    <div class="posts-listing">
      <app-post v-for="i in 5" :key="i"></app-post>
    </div>
  </v-skeleton-loader>
</template>

<script>
import SinglePost from './SinglePost.vue';
export default {
  components: {
    'app-post': SinglePost
  },
  data() {
    return {
      loading: false
    }
  },
}
</script>

<style>

</style>