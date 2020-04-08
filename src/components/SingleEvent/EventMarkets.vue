<template>
  <div class="markets">
    <v-expansion-panels
    multiple
    focusable
    tile
    >
      <v-expansion-panel
      v-for="market in markets"
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
export default {
  props: {
    markets: {}
  }
}
</script>