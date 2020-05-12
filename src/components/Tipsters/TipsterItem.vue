<template>
  <v-card class="mx-auto mb-3" color="white">
        <router-link :to="{ name: 'Profile', params: { id: tipster.id }}" tag="div">
      <v-list-item two-line>
        <v-list-item-avatar class="align-self-start">
          <img :src="tipster.photoUrl" alt="">
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{tipster.name}}</v-list-item-title>
          <div class="d-flex mb-2">
          <p class="caption mb-0"><v-icon class="mr-1" size="12">mdi-account-group</v-icon>{{tipster.followers && tipster.followers.length > 0 ? tipster.followers.length : '0'}}</p>
          <p class="caption mb-0 ml-4"> {{tipster.posts && tipster.posts.length > 0 ? tipster.posts.length : '0'}} tips</p>
          </div>
          <div class="d-flex">
          <p class="subtitle-2 success--text font-weight-medium mb-0"><v-icon color="success" class="mr-1" size="12">mdi-chart-line-variant</v-icon>{{tipster.totalProfit.toFixed(2)}}u</p>
          <p class="subtitle-2 primary--text font-weight-medium mb-0 ml-4"><v-icon color="primary" class="mr-1" size="12">mdi-shield</v-icon>{{tipster.yield.toFixed(2)}}u</p>
          </div>
        </v-list-item-content>
        <v-list-item-action class="align-self-stretch d-flex flex-column">
          <p class="caption mb-0">{{tipster.avgRating}}<v-icon size="12" class="ml-1" color="accent">mdi-star</v-icon></p>
          <v-btn @click.stop="handleSubscribe" small rounded class="mr-2 justify-self-center"
            :class="[isSubscribed ? 'secondary lighten-1 secondary--text' : 'primary darken-1']"
            >{{isSubscribed ? 'Subscribed' : '$59.99'}}</v-btn>
        </v-list-item-action>
        </v-list-item>
        </router-link>
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: {
    tipster: Object
  },
  computed: {
    isSubscribed () {
      let isSubscribed = false
      if(this.tipster.subscribers && this.tipster.subscribers.length > 0) {
        for (var i in this.tipster.subscribers) {
          if (this.tipster.subscribers[i] == this.getUser.uid){
            isSubscribed = true;
          }
        }
      }
      return isSubscribed;
    },
      ...mapGetters([
      'getUser',
    ])
  },
  methods: {
    handleSubscribe: function() {
      let userID = this.tipster.id;
      if(this.isSubscribed){
        this.$store.dispatch('unsubscribe', userID)
      }else {
        this.$store.dispatch('subscribe', userID)
      }
    }
  }
}
</script>

<style>

</style>