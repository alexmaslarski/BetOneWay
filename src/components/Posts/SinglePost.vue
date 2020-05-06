<template>
  <v-card>
      <v-list-item two-line>
      <v-list-item-avatar>
        <img :src="author.photoUrl" alt="">
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{author.name}}</v-list-item-title>
        <v-list-item-subtitle>{{post.timeStamp.toDate() | moment("from", "now")}}</v-list-item-subtitle>
      </v-list-item-content>
      </v-list-item>
    <v-divider></v-divider>
    <template v-for="(tip, index) in post.tips">
      <v-divider v-if="index > 0" :key="index"></v-divider>
      <v-list-item :key="tip.pickID">
        <v-list-item-content>
          <v-list-item-title>{{tip.selection}}</v-list-item-title>
          <v-list-item-subtitle>{{tip.market}}</v-list-item-subtitle>
          <v-list-item-subtitle>{{tip.eventName}}</v-list-item-subtitle>
          <v-list-item-subtitle>{{tip.league}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-chip small>{{tip.selectionOdd}}</v-chip>
          <v-list-item-action-text class="black--text">{{tip.eventDate.toDate() | moment("HH:MM")}}</v-list-item-action-text>
          <v-list-item-action-text>{{tip.eventDate.toDate() | moment("HH:MM")}}</v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>
    </template>
    <template>
      <v-divider></v-divider>
      <v-list-item class="py-3">
        <v-list-item-content>
          <v-row class="mx-0">
            <div class="mr-5 text-center">
              <v-list-item-subtitle class="mb-1 caption text--secondary">Bookmaker</v-list-item-subtitle>
              <v-chip small>{{post.bookmaker}}</v-chip>
            </div>
            <div class="mr-5 text-center">
              <p class="mb-1 caption text--secondary">Total Odd</p>
              <v-chip small>{{post.totalOdd}}</v-chip>
            </div>
            <div class="mr-5 text-center">
              <p class="mb-1 caption text--secondary">Stake</p>
              <v-chip small>{{post.stake}}/10</v-chip>
            </div>
          </v-row>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn fab color="primary justify-self-end">
            <v-icon class="white--text">mdi-thumb-up-outline</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </template>
    <template>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-content>
        <v-textarea rows="1" auto-grow rounded dense hide-details filled clearable label="Post a comment">
          <template slot="prepend">
          <v-avatar>
            <img :src="user.photoURL" alt="">
          </v-avatar>
        </template>
        </v-textarea>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-card>
</template>

<script>

export default {
props: {
    post: Object
  },
  data () {
    return {
      author: this.post.author,
      comments: this.post.comments
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  }
}
</script>

<style lang="scss" scoped>
</style>