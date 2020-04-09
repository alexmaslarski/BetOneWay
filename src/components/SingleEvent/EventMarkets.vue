<template>
  <div class="markets">
    <v-expansion-panels
    multiple
    focusable
    tile
    >
      <v-expansion-panel
      v-for="market in getMarkets"
      :key="market.oc_group_name"
      >
        <v-expansion-panel-header
        >
        {{ market[0].oc_group_name }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container
          fluid
          class="pa-0"
          >
          <v-row>
            <v-col
              v-for="option in market"
              :key="option.oc_pointer"
              cols="4"
              class="text-center"
              @click="addToBetSlip(option.oc_group_name, option.oc_name, option.oc_rate, option.oc_pointer)"
              >
                <p>{{ option.oc_rate }}</p>
                <p>{{ option.oc_name }}</p>
              </v-col>
            </v-row>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters([
      'getEvent',
      'getMarkets'
    ])
  },
  methods: {
    addToBetSlip (market, selection, odd, pointer){
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
    console.log(eventName);
    
      this.$store.dispatch('updateBetSlip', betSelection)
    }
  }
}
</script>