<template>
  <div class="feed">
    <v-container>
      <div class="titles d-flex">
        <h1 class="display-1 font-weight-bold">{{ $route.name }}</h1>
        <p class="display-1 text--secondary pl-3">Following</p>
      </div>
      <app-post-listing></app-post-listing>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import PostListing from '@/components/Posts/PostListing.vue';
export default {
  name: 'Feed',
  components: {
    'app-post-listing': PostListing
  }
}
</script>
