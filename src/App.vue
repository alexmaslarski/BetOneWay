<template>
  <v-app>

    <!-- Top bar -->
    <v-app-bar
      app
      elevate-on-scroll
      clipped-left
    >
      <v-btn icon @click="drawer = true">
        <v-avatar v-if="getUser" size="25">
          <img :src="getUser.photoURL" alt="">
        </v-avatar>
        <v-icon v-else>mdi-login</v-icon>
      </v-btn>


      <v-img height="22px" contain :src="require('@/assets/logo.svg')"></v-img>

      <v-btn icon>
          <v-icon>mdi-bell-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
    app
    v-model="drawer"
    clipped
    left
    >
    <app-nav-drawer-content v-if="getUser"></app-nav-drawer-content>
      <div class="pa-4" v-else>
        <v-card-title class="pl-0">Log in</v-card-title>
      <v-btn to="/signin/login" block color="success" class="mb-3">Log in</v-btn>
      <v-btn to="/signin/signup" block color="secondary lighten-1 secondary--text">Sign up</v-btn>
      </div>
      <template v-if="getUser" v-slot:append>
        <div class="pa-2">
          <v-btn @click='logOut' block>Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Content -->
    <v-content>
      <transition name="slide" mode="out-in">
      <router-view></router-view>
      </transition>
      <swipeable-bottom-sheet class="bottom-sheet" ref="swipeableBottomSheet">
      <app-bet-slip :isBetSlipOpen="isBetSlipOpen"></app-bet-slip>
      </swipeable-bottom-sheet>
    </v-content>

    <!-- Bottom nav -->
    <v-bottom-navigation app shift active-class="navigation-active" class="px-2">
      <v-btn to="/" value="Feed">
      <span>Feed</span>
        <v-icon>mdi-newspaper-variant-multiple-outline</v-icon>
      </v-btn>
      <v-btn to="/events" value="Events">
      <span>Events</span>
        <v-icon>mdi-soccer</v-icon>
      </v-btn>
      <v-btn>
        <v-icon>mdi-plus-box-outline</v-icon>
      </v-btn>
      <v-btn to="/tipsters" value="Tipsters">
        <span>Tipsters</span>
        <v-icon>mdi-account-check-outline</v-icon>
      </v-btn>
      <v-btn to="/explore" value="Explore">
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
import NavDrawer from './components/UI/NavigationDrawer.vue'
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
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      
      this.$store.dispatch('updateUser', user)
    });
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
    },
    goBack() {
      return this.$router.go(-1);
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