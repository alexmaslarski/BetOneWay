<template>
  <v-container>
      <div class="titles d-flex mb-3">
        <h1 class="display-1 font-weight-bold">{{ $route.name }}</h1>
      </div>
      <v-autocomplete
      v-model="search"
      :items="getTipstersNames"
      hide-no-data
      hide-selected
      flat
      hide-details
      placeholder="Search Tipster"
      rounded
      single-line
      dense
      filled
      append-icon=''
      class="mb-6"
      disabled=""
      >
      <v-icon slot="prepend-inner" class="mt-0">mdi-magnify</v-icon>
      </v-autocomplete>
      <v-tabs color="success" background-color="transparent" class="mb-5">
          <v-tab @click="orderByRating"><v-icon size="14" class="mr-2">mdi-medal</v-icon>  Top</v-tab>
          <v-tab @click="orderByProfit"><v-icon size="14" class="mr-2">mdi-chart-line-variant</v-icon> Profit</v-tab>
        </v-tabs>
      <app-tipster-listing :tipsters="getTipsters" ></app-tipster-listing>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import TipsterListing from '@/components/Tipsters/TipsterListing.vue';
export default {
  name: 'Tipsters',
  components: {
    'app-tipster-listing': TipsterListing
  },
  data() {
    return {
      loading: true,
      search: ''
    }
  },
  computed: {
    ...mapGetters([
      'getTipsters',
      'getTipstersNames'
    ])
  },
  methods: {
    orderByProfit() {
      this.$store.dispatch('bindTipstersByProfit')
    },
    orderByRating() {
      this.$store.dispatch('bindTipstersByRating')
    },
    searchByName() {
      this.$store.dispatch('bindTipstersByName', this.search)
      this.search = ''
    },
  },
  created() {
    this.$store.dispatch('bindTipstersByRating')
    .then(() => {
        this.loading = false;
    })
  }
}
</script>

<style>

</style>