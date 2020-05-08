<template>
  <v-col
  cols="4"
  class="text-center px-1"
  :class="{ active : isActive }"
  @click="addToBetSlip(option.oc_group_name, option.oc_name, option.oc_rate, option.oc_pointer)"
  >
  <v-card outlined class="pa-2 selection-card">
    <p class="secondary--text mb-1" >{{ option.oc_name }}</p>
    <p class="mb-0">{{ option.oc_rate }}</p>
  </v-card>
  </v-col>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: ['option'],
  data() {
    return {
      isActive: false
    }
  },
  computed: {
    ...mapGetters([
      'getEvent',
      'getMarkets'
    ])
  },
  methods: {
    addToBetSlip (market, selection, odd, pointer){
      this.isActive=!this.isActive
      let eventName = `${this.getEvent.opp_1_name} - ${this.getEvent.opp_2_name}`;
      let gameId = /(.*?)\|/g.exec(pointer);
      let gameStart = this.getEvent.game_start;
      let betSelection = {
      market,
      selection,
      odd,
      gameId: gameId[1],
      pointer,
      eventName,
      gameStart
    }
      this.$store.dispatch('updateBetSlip', betSelection)
    }
  }
}
</script>

<style scoped>
  .active {
    color: #F57F17;
  }
  .selection-card {
    background-color: #f6f7f9;
    border-color: #D7D7D7 !important;
  }
</style>