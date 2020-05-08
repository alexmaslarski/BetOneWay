<template>
  <v-container>
    <div class="betslip-wrapper">
    <v-card flat tile v-if="getBetSlip.length > 0">
      <v-card-title class="display-1 font-weight-black">BET SLIP</v-card-title>
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
      'getBetSlip'
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