<template>
  <v-container>
    <div class="betslip-wrapper mb-12">
    <v-card flat tile v-if="getBetSlip.length > 0">
      <div class="d-flex justify-space-between">
        <v-card-title class="display-1 font-weight-black secondary--text">BET SLIP</v-card-title>
        <transition name="fade" mode="out-in" >
        <v-card-actions v-if="isBetSlipOpen != 'open'">
          <div class="text-center">
            <p class="caption text--secondary font-weight-medium mb-1">Selections</p>
            <v-chip label color="accent" class="white--text justify-center font-weight-medium w-100">{{getBetSlipCount}}</v-chip>
          </div>
          <div class="text-center ml-4">
            <p class="caption text--secondary font-weight-medium mb-1">Total odds</p>
            <v-chip label color="primary darken-1" class="white--text justify-center font-weight-medium w-100">{{getTotalOdd}}</v-chip>
          </div>
        </v-card-actions>
        <v-card-actions v-else class="pa-4">
          <v-btn depressed small color="#d7d7d7" @click="clearBetSlip" ><v-icon color="white">mdi-trash-can-outline</v-icon></v-btn>
        </v-card-actions>
        </transition>
      </div>
        <div class="d-flex justify-space-between px-4 py-5 perforated">
          <div>
            <p class="caption text--secondary mb-1">Posted By:</p>
            <p class="font-weight-medium mb-0">{{getUser.displayName}}</p>
          </div>
          <div class="text-right">
            <p class="caption text--secondary mb-1">Time Posted:</p>
            <p class="font-weight-medium mb-0">{{now | moment("D MMMM, HH:mm")}}</p>
          </div>
        </div>
      <v-list>
        <app-bet-slip-item v-for="selection in getBetSlip" :key="selection.pointer" :selection="selection"></app-bet-slip-item>
      </v-list>
      <v-list>
        <v-list-item>
          <v-textarea v-model="analysis" auto-grow rows="1" placeholder="Write your analysis"></v-textarea>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>Adjust stake</v-list-item-subtitle>
            <v-slider color="primary darken-1" v-model="stake" min="1" max="10" thumb-label thumb-size="20"></v-slider>
          </v-list-item-content>
        </v-list-item>
        <div class="d-flex justify-space-between px-4">
          <div>
            <p class="caption text--secondary font-weight-medium mb-1">Paid</p>
            <v-switch class="mt-0" inset flat></v-switch>
          </div>
          <div class="d-flex">
            <div class="text-center">
            <p class="caption text--secondary font-weight-medium mb-1">Selections</p>
            <v-chip label color="accent" class="white--text justify-center font-weight-medium w-100">{{getBetSlipCount}}</v-chip>
            </div>
            <div class="text-center ml-4">
            <p class="caption text--secondary font-weight-medium mb-1">Stake</p>
            <v-chip label color="success" class="white--text justify-center font-weight-medium w-100">{{stake}} / 10</v-chip>
            </div>
            <div class="text-center ml-4">
              <p class="caption text--secondary font-weight-medium mb-1">Total odds</p>
              <v-chip label color="primary darken-1" class="white--text justify-center font-weight-medium w-100">{{getTotalOdd}}</v-chip>
            </div>
          </div>
        </div>
      </v-list>
    </v-card>
    </div>
    <v-btn block x-large @click="placeBet" color="primary darken-1" class="mb-12">Submit Tips</v-btn>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BetSlipItem from './BetSlipItem'
export default {
  props: {
    isBetSlipOpen: String
  },
  data () {
    return {
      now: '',
      analysis: '',
      stake: 1
    }
  },
  components: {
    'app-bet-slip-item': BetSlipItem
  },
  created() {
    setInterval(this.getNow, 1000);
  },
  computed: {
    ...mapGetters([
      'getBetSlip',
      'getBetSlipCount',
      'getTotalOdd',
      'getUser'
    ])
  },
  methods: {
    getNow: function() {
      this.now = this.$moment()

    },
    ...mapActions([
      'placeBet',
      'clearBetSlip'
    ])
  }
}
</script>

<style lang="scss" scoped>
.w-100 {
  width: 100%;
}
.betslip-wrapper {
  position: relative;
  &::before {
  position: absolute;
  top: -20px;
  display: block;
  content: "";
  background: radial-gradient(circle, transparent 15px, #fff 16px);
  background-size: 40px 45px;
  background-position: -20px -20px;
  width: 100%;
  height: 40px;
  z-index: -1;
  }
  &::after {
  position: absolute;
  bottom: -20px;
  content: "";
  display: block;
  background: radial-gradient(circle, transparent 15px, #fff 16px);
  background-size: 40px 45px;
  background-position: -20px -20px;
  width: 100%;
  height: 40px;
  z-index: -1;
  }
}
.perforated {
  border-bottom: 2px dashed #f6f7f9;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    bottom: -10px;
    left: -10px;
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background-color: #f0f2f5;
  }
  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    right: -10px;
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background-color: #f0f2f5;
    min-height: unset;
  }
}
</style>