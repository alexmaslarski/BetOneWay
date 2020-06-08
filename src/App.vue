<template>
  <v-app>

    <!-- Top bar -->
    <v-app-bar
      app
      elevate-on-scroll
      clipped-left
    >
    <!-- On click show drawer -->
      <v-btn icon @click="drawer = !drawer"> 
        <v-avatar v-if="getUser" size="25">
          <img :src="getUser.photoURL" alt="">
        </v-avatar>
        <v-icon v-else>mdi-login</v-icon>
      </v-btn>

      <!-- logo -->
      <v-img height="22px" contain :src="require('@/assets/logo.svg')"></v-img>

      <!-- Notification button -->
      <v-btn icon disabled="">
          <v-icon>mdi-bell-outline</v-icon>
      </v-btn>
    </v-app-bar>
    

    <!-- Navigation drawer -->
    <v-navigation-drawer
    app
    v-model="drawer"
    clipped
    left
    >
    <!-- If a user is logged in, show profile info, else show log in and register buttons -->
    <app-nav-drawer-content v-if="getUser"></app-nav-drawer-content>
      <div class="pa-4" v-else>
        <v-card-title class="pl-0">Log in</v-card-title>
      <v-btn to="/signin/login" block color="success" class="mb-3">Log in</v-btn>
      <v-btn to="/signin/signup" block color="secondary lighten-1 secondary--text">Sign up</v-btn>
      </div>
      <div class="pa-2">
          <v-btn to="/tutorial" block>Tutorial</v-btn>
      </div>
      <!-- If user is logged in, show logout button -->
      <template v-if="getUser" v-slot:append>
        <div class="pa-2">
          <v-btn @click='logOut' block>Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Content -->
    <v-content>
      <!-- Slide transition for when swithcing pages -->
      <transition name="slide" mode="out-in">
      <router-view></router-view>
      </transition>
      <!-- Bet slip sheet -->
      <swipeable-bottom-sheet class="bottom-sheet" ref="swipeableBottomSheet">
      <app-bet-slip :isBetSlipOpen="isBetSlipOpen"></app-bet-slip>
      </swipeable-bottom-sheet>
    </v-content>

    <!-- Bottom nav -->
    <v-bottom-navigation app active-class="navigation-active" class="px-2">
      <v-btn to="/" value="Feed">
      <span>Feed</span>
        <v-icon>mdi-newspaper-variant-multiple-outline</v-icon>
      </v-btn>
      <v-btn to="/events" value="Events">
      <span>Events</span>
        <v-icon>mdi-soccer</v-icon>
      </v-btn>
      <v-btn to="/new-post" value="New Post">
        <v-icon>mdi-plus-box-outline</v-icon>
      </v-btn>
      <v-btn to="/tipsters" value="Tipsters">
        <span>Tipsters</span>
        <v-icon>mdi-account-check-outline</v-icon>
      </v-btn>
      <v-btn disabled to="/explore" value="Explore">
        <span>Explore</span>
        <v-icon>mdi-earth</v-icon>
      </v-btn>
  </v-bottom-navigation>
    
  </v-app>
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import firebase from "firebase";
import BetSlip from '@/components/BetSlip/BetSlipListing'
import NavDrawer from '@/components/UI/NavigationDrawer.vue'
import { SwipeableBottomSheet } from "vue-swipeable-bottom-sheet";
export default {
  name: 'App',
  components: {
    'app-nav-drawer-content': NavDrawer,
    'app-bet-slip': BetSlip,
    SwipeableBottomSheet
  },
  data () {
    return {
      isBetSlipOpen: 'close',
      drawer: false
    }
  },
  mounted () {
    // when user auth state changes, update current user
    firebase.auth().onAuthStateChanged(user => {
      this.$store.dispatch('updateUser', user)
    });

    // watcher for bet slip state
    this.$refs.swipeableBottomSheet.setState("close")
    this.$watch(
        () => {
            return this.$refs.swipeableBottomSheet.state
        },
      (val) => {
        this.isBetSlipOpen = val;
      })
  },
    computed: {
    ...mapGetters([
      'getUser',
      'getBetSlipCount',
      'getBetSlipOpened'
    ])
  },
  watch: {
    // checks for bet slip count and controls the state of the bet slip
    getBetSlipCount(newState) {
      if(newState > 0 && this.$refs.swipeableBottomSheet.state !== "open") {
        this.$refs.swipeableBottomSheet.setState("half")
      }else if(newState <= 0){
        this.$refs.swipeableBottomSheet.setState("close")
      }
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
    }
  }
};
</script>
<style lang="scss">
.bottom-sheet {
  z-index: 3;
  & > .card {
    z-index: 3;
    background: #f0f2f5 !important;
  }
  & > .pan-area {
    padding: 20px 0;
  }
}
.slide-enter {
      opacity: 0;
  }

  .slide-enter-active {
      animation: slide-in 0.5s ease-out forwards;
      transition: opacity .5s;
  }

  .slide-leave-active {
      animation: slide-out 0.5s ease-out forwards;
      transition: opacity 0.5s;
      opacity: 0;
      position: absolute;
  }

  .slide-move {
      transition: transform 0.5s;
  }
  
  .navigation-active {
    span {
      color: #3CD350;
    }
    border-top: 2px solid #3CD350;
  }

  @keyframes slide-in {
      from {
          transform: translateY(20px);
      }
      to {
          transform: translateY(0);
      }
  }

  @keyframes slide-out {
      from {
          transform: translateY(0);
      }
      to {
          transform: translateY(20px);
      }
  }
</style>