<template>
  <v-container>
      <div class="titles d-flex">
        <h1 class="display-1 font-weight-bold">{{ $route.name }}</h1>
      </div>
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
      loading: true
    }
  },
  computed: {
    ...mapGetters([
      'getTipsters',
    ])
  },
  methods: {
  },
  created() {
    this.$store.dispatch('bindTipsters')
    .then(() => {
        this.loading = false;
    })
  }
}
</script>

<style>

</style>