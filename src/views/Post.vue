<template>
  <v-container>
      <app-post v-if="post" :post="post" :expanded="true"></app-post>
  </v-container>
</template>

<script>
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
    this.$store.dispatch('bindPosts')
    this.updatePostByID();
  }
}
</script>

<style>

</style>