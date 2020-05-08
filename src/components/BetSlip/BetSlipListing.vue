<template>
  <v-container>
    <div class="betslip-wrapper">
    <v-card flat tile v-if="getBetSlip.length > 0">
      <div class="d-flex justify-space-between">
        <v-card-title class="display-1 font-weight-black">BET SLIP</v-card-title>
        <v-card-actions>
          <div class="text-center">
            <p class="caption text--secondary font-weight-medium mb-1">Selections</p>
            <v-chip label color="accent" class="white--text justify-center font-weight-medium w-100">{{getBetSlipCount}}</v-chip>
          </div>
          <div class="text-center ml-4">
            <p class="caption text--secondary font-weight-medium mb-1">Total odds</p>
            <v-chip label color="primary darken-1" class="white--text justify-center font-weight-medium w-100">{{getTotalOdd}}</v-chip>
          </div>
        </v-card-actions>
      </div>
      <v-list
      >
      <app-bet-slip-item v-for="selection in getBetSlip" :key="selection.pointer" :selection="selection"></app-bet-slip-item>

      </v-list>
      <v-card-actions>
        <v-row>
          <v-col><v-btn @click="placeBet" color="success">PLACE BETS</v-btn></v-col>
          <v-col><v-btn @click="clearBetSlip" >CLEAR</v-btn></v-col>
        </v-row>
      </v-card-actions>
    </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BetSlipItem from './BetSlipItem'
export default {
  components: {
    'app-bet-slip-item': BetSlipItem
  },
  computed: {
    ...mapGetters([
      'getBetSlip',
      'getBetSlipCount',
      'getTotalOdd'
    ])
  },
  methods: {
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
</style>