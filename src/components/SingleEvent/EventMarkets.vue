<template>
  <div class="markets">
    <v-card
    v-for="market in markets"
    :key="market.oc_group_name"
    max-width="100%"
    class="mx-auto"
    >
      <v-card-title class="white--text green">{{ market[0].oc_group_name }}</v-card-title>
      <v-container
      fluid
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
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    markets: {}
  }
}
</script>

<style>

</style>