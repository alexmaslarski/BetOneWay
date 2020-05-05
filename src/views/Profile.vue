<template>
  <v-container>
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
  </v-container>
</template>

<script>
import Vue from 'vue';
import firebase from "firebase";
import { mapGetters } from 'vuex';
import BetHistoryItem from '@/components/Profile/BetHistoryItem'
export default {
  name: 'Profile',
  components: {
  'app-bet-history-item': BetHistoryItem
  },
  data() {
    return {
      user: null
    };
  },
  computed: {
    ...mapGetters([
      'getUser',
      'getBetHistory'
    ])
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

<style>
</style>