<template>
  <v-skeleton-loader
    :loading="loading"
    type="card, list-item@6"
  >
    <div class="event">
        <app-event-heading
      :team1="getEvent.opp_1_name"
      :team2="getEvent.opp_2_name"
      :tournament="getEvent.tournament_name"
      :date="getEvent.game_start"
      >
      </app-event-heading>
      <app-event-markets
      :markets="getMarkets"
      ></app-event-markets>
    </div>
  </v-skeleton-loader>
</template>

<script>
import { mapGetters } from 'vuex';
import EventHeading from '@/components/SingleEvent/EventHeading.vue';
import EventMarkets from '@/components/SingleEvent/EventMarkets.vue';
export default {
  name: 'Event',
  components: {
    'app-event-heading': EventHeading,
    'app-event-markets': EventMarkets
  },
  data() {
    return {
      id: this.$route.params.id,
      loading: true
    }
  },
  watch: {
    '$route'(to) {
      this.id = to.params.id;
    }
  },
  computed: {
    ...mapGetters([
      'getEvent',
      'getMarkets'
    ])
  },
  created() {
    this.$store.dispatch('loadEvent', this.id)
      .then(() => {
        this.loading = false;
      })
  }
}
</script>
