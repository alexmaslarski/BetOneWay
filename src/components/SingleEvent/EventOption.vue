<template>
  <v-col
  cols="4"
  class="text-center px-1"
  >
  <v-card
  :class="{ active : isActive }"
  class="pa-2 selection-card"
  @click="addToBetSlip(option.oc_group_name, option.oc_name, option.oc_rate, option.oc_pointer)"
  outlined
  >
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
      let tournament = this.getEvent.tournament_name;
      let in_play = this.getEvent.in_play;
      let betSelection = {
      market,
      selection,
      odd,
      gameId: gameId[1],
      pointer,
      eventName,
      gameStart,
      tournament,
      in_play
    }
      this.$store.dispatch('updateBetSlip', betSelection)
    }
  }
}
</script>

<style lang="scss" scoped>
.selection-card {
  background-color: #f6f7f9;
  border-color: #D7D7D7;
  &.active {
    background-color: rgba(254, 172, 14, 0.15);
    border-color: #FEAC0E;
    p {
      color: #000000;
    }
  }
}
</style>