<template>
  <v-card class="mb-3">
      <v-list-item two-line>
      <v-list-item-avatar>
        <img :src="author.photoUrl" alt="">
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{author.name}}</v-list-item-title>
        <v-list-item-subtitle>{{bet.timeStamp.toDate() | moment("from", "now")}}</v-list-item-subtitle>
      </v-list-item-content>
      </v-list-item>
    <v-divider></v-divider>
    <template v-for="(game, index) in bet.selection">
      <v-list-item :key="game.pointer" class="border" :class="[index === bet.selection.length - 1 ? 'double' : '']">
        <v-list-item-content>
          <v-list-item-title class="font-weight-medium mb-3">{{game.selection}}</v-list-item-title>
          <v-list-item-subtitle class="mb-3">{{game.market}}</v-list-item-subtitle>
          <v-list-item-subtitle class="mb-3">{{game.eventName}}</v-list-item-subtitle>
          <v-list-item-subtitle>{{game.tournament}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-chip small>{{game.odd}}</v-chip>
          <v-list-item-action-text class="black--text">{{game.gameStart | moment("HH:MM")}}</v-list-item-action-text>
          <v-list-item-action-text>{{game.gameStart | moment("D MMM YYYY")}}</v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>
    </template>
    <template>
      <v-list-item class="py-3">
        <v-list-item-content>
          <v-row class="mx-0">
            <div class="mr-5 text-center">
              <v-list-item-subtitle class="mb-1 caption text--secondary">Bookmaker</v-list-item-subtitle>
              <v-chip small>Bet365</v-chip>
            </div>
            <div class="mr-5 text-center">
              <p class="mb-1 caption text--secondary">Total Odd</p>
              <v-chip small>{{bet.totalOdd}}</v-chip>
            </div>
            <div class="mr-5 text-center">
              <p class="mb-1 caption text--secondary">Stake</p>
              <v-chip small>{{bet.stake}}/10</v-chip>
            </div>
          </v-row>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn @click="handleLike" fab color="primary justify-self-end">
            <v-icon class="white--text">mdi-thumb-up-outline</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </template>
    <template>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-content>
        <v-textarea v-model="comment" rows="1" single-line auto-grow rounded dense hide-details filled label="Post a comment">
          <template slot="prepend">
          <v-avatar size="30">
            <img :src="user.photoURL" alt="">
          </v-avatar>
        </template>
          <template slot="append-outer">
            <v-btn @click="addComment" icon small>
              <v-icon class="primary--text">mdi-send</v-icon>
            </v-btn>
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
      comments: this.post.comments,
      bet: this.post.bet,
      comment: ''
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    isLiked () {
      let likesArray = this.post.likedBy
      let isLiked = false
      if(likesArray.length > 0 && likesArray) {
        for (var i in likesArray) {
          if (likesArray[i] == this.user.uid){
            isLiked = true;
          }
        }
      }
      return isLiked;
    }
  },
  methods: {
    addComment: function() {
      let comment = this.comment;
      let postID = this.post.postID;
      let payload = {
        comment,
        postID
      }
      return this.$store.dispatch('addComment', payload)
      .then(() => {
        this.comment = '';
        
      })
    },
    handleLike: function() {
      let postID = this.post.postID;
      if(this.isLiked){
        this.$store.dispatch('removeLike', postID)
      }else {
        this.$store.dispatch('addLike', postID)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.border {
  border-bottom: 2px dashed #f6f7f9;
  &.double {
    border-bottom: 3px solid #f6f7f9;
  }
}
</style>