<template>
    <div class="profile">
      <v-card tile>
        <v-card-subtitle><app-back></app-back></v-card-subtitle>
        <v-list>
        <v-list-item>
          <v-list-item-avatar size="75" class="align-self-start mt-5">
            <img :src="getProfile.photoUrl" alt="">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-card-title class="pa-0">{{ getProfile.name }} {{id}}</v-card-title>
            <v-list-item-subtitle class="mb-4" v-if="getFollowers" ><v-icon size="16">mdi-account-group</v-icon> {{getFollowers.length}} followers</v-list-item-subtitle>
            <div class="d-flex">
            <v-btn @click="logOut" small rounded color="success" class="mr-2">Following</v-btn>
            <v-btn small rounded color="primary darken-1">$59.99</v-btn>
            </div>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-row>
            <v-col>
              <div class="rating d-flex">
              <p class="mb-0">{{getAvgRating}}</p>
              <v-rating color="secondary" readonly x-small :value="getAvgRating" length="5" half-increments dense></v-rating>
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
          <v-tab>Statistics</v-tab>
          <v-tab>Feed</v-tab>
          <v-tab>About</v-tab>
        </v-tabs>
      </v-card>
      <v-tabs-items class="secondary lighten-1" v-model="tab">
        <v-tab-item>
         
        </v-tab-item>
        <v-tab-item>
          <v-container>
          <app-post v-for="post in getProfilePosts" :key="post.id" :post="post"></app-post>
          </v-container>
        </v-tab-item>
        <v-tab-item>
          <h2>Tab 3</h2>
        </v-tab-item>
      </v-tabs-items>
      
    </div>
  <!-- <v-container>
    <v-card
      v-if="getUser"
      >
      <v-btn @click='logOut' block>Logout</v-btn>
        <v-img :src="getUser.photoURL" alt=""></v-img>
        <v-card-title>{{ getUser.displayName }}</v-card-title>
        <v-card-subtitle>{{ getUser.email }}</v-card-subtitle>
        <v-divider></v-divider>
        <template v-if="getBetHistory">
        <v-card-title>
          Bet History
        </v-card-title>
        <v-expansion-panels
        multiple
        focusable
        tile
        >
          <v-expansion-panel
          v-for="betGroup in getBetHistory"
          :key="betGroup.timeStamp.seconds"
          >
            <v-expansion-panel-header>
              {{ betGroup.timeStamp.toDate() | moment("DD MMMM, HH:mm") }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-container
              fluid
              class="py-0"
              >
              <v-list>
                <app-bet-history-item v-for="betEvent in betGroup.selection" :key="betEvent.pointer" :event="betEvent"></app-bet-history-item>
              </v-list>

              </v-container>
            </v-expansion-panel-content>

          </v-expansion-panel>

        </v-expansion-panels>
        </template>

      </v-card>
  </v-container> -->
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
      tab: null
    };
  },
  computed: {
    ...mapGetters([
      'getUser',
      'getProfile',
      'getFollowers',
      'getFollowing',
      'getSubscribers',
      'getSubscribedTo',
      'getRating',
      'getAvgRating',
      'getProfilePosts',
      'getBetHistory',
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
    updateUserProfile() {
    if(this.userID === ''){
      this.userID = this.getUser.uid;
    }
    this.$store.dispatch('bindProfileInfo', this.userID)
    },
    handleFollow: function() {
      let userID = this.userID;
      if(this.isFollowed){
        this.$store.dispatch('followUser', userID)
      }else {
        this.$store.dispatch('unfollowUser', userID)
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