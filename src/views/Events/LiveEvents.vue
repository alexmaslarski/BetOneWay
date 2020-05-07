<template>
  <v-skeleton-loader :loading="loading" type="card-heading, list-item@3">
    <v-container>
      <app-back></app-back>
      <app-event-list :Tournaments = getLiveTournaments title="Live Games"></app-event-list>
    </v-container>
  </v-skeleton-loader>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import EventList from '@/components/EventListing/EventList.vue';
import BackBtn from '@/components/UI/backButton.vue';
export default {
  name: 'LiveEvents',
  components: {
    'app-event-list': EventList,
    'app-back': BackBtn
  },
  data() {
    return {
      loading: true
    }
  },
  computed: {
    ...mapGetters([
      'getLiveTournaments',
      'getLiveEventsList'
    ])
  },
  methods: {
    ...mapActions([
      'loadLiveEvents'
    ])
  },
  created() {
    this.$store.dispatch('loadLiveEvents')
    .then(() => {
        this.loading = false;
    })
  }
}
</script>

<style>

</style>