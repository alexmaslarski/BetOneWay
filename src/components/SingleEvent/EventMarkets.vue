<template>
  <v-container>
    <v-expansion-panels
    multiple
    >
      <v-expansion-panel
      v-for="market in getMarkets"
      :key="market.oc_group_name"
      class="my-1"
      >
        <v-expansion-panel-header>
        {{ market[0].oc_group_name }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-divider></v-divider>
          <v-container
          fluid
          class="pa-0"
          >
          <v-row>
            <app-event-option
            v-for="option in market"
            :key="option.oc_pointer"
            :option="option"
            >

            </app-event-option>
            </v-row>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import EventOption from './EventOption';
export default {
  components: {
    'app-event-option': EventOption
  },
  computed: {
    ...mapGetters([
      'getEvent',
      'getMarkets'
    ])
  }
}
</script>
<style lang="scss" scoped>
</style>