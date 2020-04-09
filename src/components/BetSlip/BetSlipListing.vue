<template>
<v-card outlined tile v-if="getBetSlip.length > 0">
  <v-card-title>BET SLIP</v-card-title>
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

<style>

</style>