<template>
  <v-container>
      <v-card-subtitle class="px-0 pt-0"><app-back></app-back></v-card-subtitle>
      <app-post v-if="post" :post="post" :expanded="true"></app-post>
  </v-container>
</template>

<script>
// Single post page
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import SinglePost from '@/components/Posts/SinglePost.vue';
export default {
  name: 'Post',
  components: {
    'app-post': SinglePost
  },
  data() {
    return {
      post: {},
      id: this.$route.params.id
    }
  },
  watch: {
    // gets post by id and updates on id change
    getPosts() {
      this.updatePostByID();
    }
  },
  computed: {
    ...mapGetters([
      'getPosts',
      'getPostByID'
    ])
  },
  methods: {
    updatePostByID: function(){
      this.post = this.$store.getters.getPostByID(this.id)
    },
    ...mapActions([
      'bindPosts'
    ])
  },
  created() {
    // when component is created, binds posts and updates component info
    this.$store.dispatch('bindPosts')
    this.updatePostByID();
  }
}
</script>

<style>

</style>