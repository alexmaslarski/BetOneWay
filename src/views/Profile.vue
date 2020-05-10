<template>
    <div class="profile">
      <v-card tile>
        <div class="d-flex justify-space-between">
        <v-card-subtitle><app-back></app-back></v-card-subtitle>
        <v-card-subtitle @click="dialog = true" v-if="getUser.uid === getProfile.id"><v-icon>mdi-pencil</v-icon></v-card-subtitle>
        </div>
        <v-list>
        <v-list-item>
          <v-list-item-avatar size="75" class="align-self-start mt-5">
            <img :src="getProfile.photoUrl" alt="">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-card-title class="pa-0">{{ getProfile.name }}</v-card-title>
            <v-list-item-subtitle class="mb-4" v-if="getFollowers" ><v-icon size="16">mdi-account-group</v-icon> {{getFollowers.length}} followers</v-list-item-subtitle>
            <div class="d-flex">

            <v-btn @click="handleFollow" small rounded class="mr-2"
            :class="[isFollowed ? 'success' : 'primary']"
            >{{isFollowed ? 'Following' : 'Follow'}}</v-btn>

            <v-btn @click="handleSubscribe" small rounded class="mr-2"
            :class="[isSubscribed ? 'secondary lighten-1 secondary--text' : 'primary darken-1']"
            >{{isSubscribed ? 'Subscribed' : '$59.99'}}</v-btn>

            </div>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-row>
            <v-col>
              <div class="rating d-flex">
              <p class="mb-0">{{getAvgRating ? getAvgRating : 'No rating'}}</p>
              <v-rating v-if="getAvgRating" color="secondary" background-color="secondary lighten-1" readonly small :value="parseFloat(getAvgRating)" length="5" half-increments dense></v-rating>
            </div>
            <p class="caption" v-if="getRating">{{getRating.length}} ratings</p>
            </v-col>
            <v-col>
              <p class="mb-0" v-if="getProfilePosts">{{getProfilePosts.length}}</p>
              <p class="caption">Tips</p>
            </v-col>
            <v-col>
              <p class="mb-0">Football</p>
              <p class="caption text-no-wrap">Preffered sport</p>
            </v-col>
            <v-col>
              <p class="mb-0">6</p>
              <p class="caption">Streak</p>
            </v-col>
          </v-row>
        </v-list-item>
        </v-list>
        <v-tabs color="success" centered grow class="px-4" v-model="tab">
          <v-tab :disabled="!getProfilePosts || !getProfilePosts.length > 0">Statistics</v-tab>
          <v-tab :disabled="!getProfilePosts || !getProfilePosts.length > 0">Feed</v-tab>
          <v-tab>About</v-tab>
        </v-tabs>
      </v-card>
      <v-tabs-items class="secondary lighten-1" v-model="tab">
        <v-tab-item :disabled="!getProfilePosts || !getProfilePosts.length > 0">
          <v-container>
         <v-card class="mt-3">
           <v-list-item v-if="getProfilePosts && getProfilePosts.length > 0">
             <v-row class="ma-0">
               <v-col class="pa-0 align-center d-flex">
                <v-list-item-subtitle>Last 5 tips</v-list-item-subtitle>
               </v-col>
               <v-col class="justify-end text-right pa-0">
               <v-chip
               class="ml-1"
               label
               v-for="post in getProfilePosts.slice().reverse().slice(0, 5)"
               :key="post.postID"
               :color="post.bet.conclusion === 'Lost' ? 'error' : 'success'"
               >
               {{post.bet.conclusion === 'Lost' ? 'L' : 'W'}}</v-chip>
               </v-col>
             </v-row>
           </v-list-item>
         </v-card>
         
           <v-row class="px-2 mt-2" v-if="getProfilePosts && getProfilePosts.length > 0">
             <v-col cols="6" class="pa-1">
               <v-card class="text-center py-6 px-2">
                 <v-list-item-subtitle class="secondary--text font-weight-medium">Profit</v-list-item-subtitle>
                 <v-list-item-title class="title">{{getProfit}}u</v-list-item-title>
               </v-card>
             </v-col>
             <v-col cols="6" class="pa-1">
               <v-card class="text-center py-6 px-2">
                 <v-list-item-subtitle class="secondary--text font-weight-medium">Yield</v-list-item-subtitle>
                 <v-list-item-title class="title">{{getYield}}%</v-list-item-title>
               </v-card>
             </v-col>
             <v-col cols="6" class="pa-1">
               <v-card class="text-center py-6 px-2">
                 <v-list-item-subtitle class="secondary--text font-weight-medium">Avg. odds</v-list-item-subtitle>
                 <v-list-item-title class="title">{{getAvgOdd}}</v-list-item-title>
               </v-card>
             </v-col>
             <v-col cols="6" class="pa-1">
               <v-card class="text-center py-6 px-2">
                 <v-list-item-subtitle class="secondary--text font-weight-medium">Avg. Stake</v-list-item-subtitle>
                 <v-list-item-title class="title">{{getAvgStake}} / 10</v-list-item-title>
               </v-card>
             </v-col>
           </v-row>
          </v-container>
        </v-tab-item>

        <v-tab-item :disabled="!getProfilePosts || !getProfilePosts.length > 0">
          <v-container>
          <app-post v-for="post in getProfilePosts" :key="post.id" :post="post"></app-post>
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <v-container>
            <v-card class="mb-3">
              <v-card-title class="justify-center"><span>Rate Me</span></v-card-title>
              <v-card-text class="text-center">
              <v-rating @input="submitRating" v-model="newRating" x-large color="accent" background-color="secondary" length="5" half-increments dense></v-rating>
              </v-card-text>
            </v-card>
            <v-card v-if="getBio">
              <v-card-title>About Me</v-card-title>
              <v-card-text>
                {{getBio}}
              </v-card-text>
            </v-card>
          </v-container>
        </v-tab-item>
      </v-tabs-items>

      <v-dialog v-model="dialog">
        <v-card>
          <v-card-title>Update Bio</v-card-title>
          <v-card-text>
            <v-textarea no-resize autoGrow v-model="bioText"></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="updateBio">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>

<script>
import Vue from 'vue';
import firebase from "firebase";
import { mapGetters } from 'vuex';
import SinglePost from '@/components/Posts/SinglePost.vue';
// import BetHistoryItem from '@/components/Profile/BetHistoryItem'
export default {
  name: 'Profile',
  components: {
    'app-post': SinglePost
  // 'app-bet-history-item': BetHistoryItem
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      userID: this.id,
      tab: null,
      dialog: false,
      bioText: '',
      newRating: 0
    };
  },
  computed: {
    isFollowed () {
      let isFollowed = false
      if(this.getFollowers && this.getFollowers.length) {
        for (var i in this.getFollowers) {
          if (this.getFollowers[i] == this.getUser.uid){
            isFollowed = true;
          }
        }
      }
      return isFollowed;
    },
    isSubscribed () {
      let isSubscribed = false
      if(this.getSubscribers && this.getSubscribers.length > 0) {
        for (var i in this.getSubscribers) {
          if (this.getSubscribers[i] == this.getUser.uid){
            isSubscribed = true;
          }
        }
      }
      return isSubscribed;
    },
    ...mapGetters([
      'getUser',
      'getProfile',
      'getBio',
      'getFollowers',
      'getFollowing',
      'getSubscribers',
      'getSubscribedTo',
      'getRating',
      'getAvgRating',
      'getProfilePosts',
      'getBetHistory',
      'getProfit',
      'getYield',
      'getAvgOdd',
      'getAvgStake'
    ])
  },
  watch: {
    '$route'(to) {
      if(to.params.id){
        this.userID = to.params.id;
      }else {
        this.userID = this.getUser.uid
      }
      this.updateUserProfile();
    }
  },
  methods: {
    logOut() {
      firebase.auth().signOut();
      Vue.$toast.open({
        message: 'Logged out',
        position: 'bottom',
        type: 'info',
        dismissible: true
      });
    },
    updateBio() {
    this.$store.dispatch('updateBio', this.bioText)
    this.dialog = false;
    this.bioText = '';
    },
    submitRating() {
      console.log('rate');
      
      let rating = {
        rate: this.newRating,
        userID: this.getProfile.id
      }
    this.$store.dispatch('submitRating', rating)
    },
    updateUserProfile() {
    if(this.userID === ''){
      this.userID = this.getUser.uid;
    }
    this.$store.dispatch('bindProfileInfo', this.userID)
    },
    handleFollow: function() {
      let userID = this.getProfile.id;
      if(this.isFollowed){
        this.$store.dispatch('unfollowUser', userID)
      }else {
        this.$store.dispatch('followUser', userID)
      }
    },
    handleSubscribe: function() {
      let userID = this.getProfile.id;
      if(this.isSubscribed){
        this.$store.dispatch('unsubscribe', userID)
      }else {
        this.$store.dispatch('subscribe', userID)
      }
    }
  },
  created() {
    this.updateUserProfile();
  }
};
</script>

<style>
</style>