<template>
  <v-col
  cols="4"
  class="text-center"
  :class="{ active : isActive }"
  @click="addToBetSlip(option.oc_group_name, option.oc_name, option.oc_rate, option.oc_pointer)"
  >
    <p>{{ option.oc_rate }}</p>
    <p>{{ option.oc_name }}</p>
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
      let betSelection = {
      market,
      selection,
      odd,
      gameId: gameId[1],
      pointer,
      eventName
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
</style>