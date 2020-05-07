<template>
  <v-skeleton-loader :loading="loading" type="card-heading, list-item@3">
  <v-container>
    <app-event-slider
    :liveEventsList = getLiveEventsList
    title = "Live Games"
    type="live"
    link="LiveEvents"
    class="mb-3">
    </app-event-slider>

    <app-event-slider
    :liveEventsList = getLiveEventsList
    title = "Hot Games"
    type="regular"
    class="mb-3">
    </app-event-slider>

    <app-event-list :Tournaments = getAllTournaments title="All Games"></app-event-list>
  </v-container>
  </v-skeleton-loader>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import EventList from '@/components/EventListing/EventList.vue';
import EventSlider from '@/components/EventListing/EventSlider.vue';
export default {
  name: 'AllEvents',
  components: {
    'app-event-list': EventList,
    'app-event-slider': EventSlider
  },
  data() {
    return {
      loading: true
    }
  },
  computed: {
    ...mapGetters([
      'getAllTournaments',
      'getLiveTournaments',
      'getLiveEventsList',
      'getLineTournaments'
    ])
  },
  methods: {
    ...mapActions([
      'loadAllEvents',
      'loadLiveEvents',
      'loadLineEvents'
    ])
  },
  created() {
    this.$store.dispatch('loadAllEvents')
    .then(() => {
        this.loading = false;
    })
  }
}
</script>

<style>

</style>