<template>
  <v-skeleton-loader :loading="loading" type="card-heading, list-item@3">
    <div class="posts-listing">
      <app-post v-for="post in getPosts" :key="post.id" :post="post"></app-post>
    </div>
  </v-skeleton-loader>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import SinglePost from './SinglePost.vue';
export default {
  components: {
    'app-post': SinglePost
  },
  data() {
    return {
      loading: true
    }
  },
    computed: {
    ...mapGetters([
      'getPosts'
    ])
  },
  methods: {
    ...mapActions([
      'bindPosts'
    ])
  },
  created() {
    this.$store.dispatch('bindPosts')
    .then(() => {
        this.loading = false;
    })
  }
}
</script>

<style>

</style>