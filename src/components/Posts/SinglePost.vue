<template>
    <v-card :class="[expanded ? 'margin-bottom' : 'mb-3']">
        <v-list-item two-line>
        <router-link :to="{ name: 'Profile', params: { id: post.author.userID }}" tag="div">
        <v-list-item-avatar>
          <img :src="post.author.photoUrl" alt="">
        </v-list-item-avatar>
        </router-link>
        <v-list-item-content>
          <router-link :to="{ name: 'Profile', params: { id: post.author.userID }}" tag="div">
          <v-list-item-title>{{post.author.name}}</v-list-item-title>
          </router-link>
          <v-list-item-subtitle>{{post.bet.timeStamp.toDate() | moment("from", "now")}}</v-list-item-subtitle>
        </v-list-item-content>
        
        
        <div>
            <v-chip small v-if="post.bet.selection.length > 1" class="font-weight-medium" color="accent">COMBO</v-chip>
            <v-chip small v-if="post.bet.live" class="font-weight-medium ml-1" color="error">LIVE</v-chip>
        </div>
        </v-list-item>


      <v-divider></v-divider>
      <router-link :to="{ name: 'Post', params: { id: post.postID }}" tag="div">
      <template v-for="(game, index) in post.bet.selection">
        <v-list-item :key="game.pointer" class="border" :class="[index === post.bet.selection.length - 1 ? 'double' : '']">
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
        
      <template v-if="post.bet.analysis.length > 0">
        <v-btn v-if="!expanded" small text retain-focus-on-click block>Click to see analysis</v-btn>
        <v-list-item v-else>
          <v-list-item-content class="pb-0">
            <p class="mb-0 body-2">{{post.bet.analysis}}</p>
          </v-list-item-content>
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
                <v-chip small>{{post.bet.totalOdd}}</v-chip>
              </div>
              <div class="mr-5 text-center">
                <p class="mb-1 caption text--secondary">Stake</p>
                <v-chip small>{{post.bet.stake}}/10</v-chip>
              </div>
            </v-row>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn
            @click.stop="handleLike"
            fab
            depressed
            class="primary justify-self-end"
            :class="[isLiked ? 'primary white--text' : 'secondary lighten-1 primary--text']"
            :disabled="!user"
            >
              <v-icon>mdi-thumb-up-outline</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item v-if="post.likes > 0 || post.commentCount > 0">
          <v-row>
            <p v-if="post.likes > 0" class="subtitle-2 font-weight-regular secondary--text px-3">{{post.likes}} likes</p>
            <p v-if="post.commentCount > 0" class="subtitle-2 font-weight-regular secondary--text px-3">{{post.commentCount}} comments</p>
          </v-row>
        </v-list-item>
      </template>
      </router-link>


      <template v-if="expanded && post.comments.length > 0">
        <v-divider></v-divider>
        <v-list-item v-for="comment in post.comments" :key="comment.timeStamp.nanoseconds">
          <v-list-item-avatar class="align-self-start mt-4">
            <img :src="comment.commentAuthor.photoUrl" alt="">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-card flat color="secondary lighten-1" class="pa-2">
            <v-list-item-title class="font-weight-medium mb-3 subtitle-2">{{comment.commentAuthor.name}}</v-list-item-title>
            <p class="mb-0">{{comment.commentText}}</p>
            </v-card>
            <v-list-item-subtitle>{{comment.timeStamp.toDate() | moment("from", "now")}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>



      <template v-if="user">
        <v-divider></v-divider>
        <v-list-item :class="{'comment-fixed' : expanded}">
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
    post: Object,
    expanded: Boolean
  },
  data () {
    return {
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
      if(this.user && likesArray && likesArray.length > 0) {
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
.comment-fixed {
  position: fixed;
  bottom: 56px;
  left: 0;
  width: 100%;
  background-color: white;
}
.margin-bottom {
  margin-bottom: 70px !important;
}
</style>