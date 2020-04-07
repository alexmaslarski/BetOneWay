<template>
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
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
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
      id: this.$route.params.id
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
  methods: {
    ...mapActions([
      'loadEvent'
    ])
  },
  created() {
    this.$store.dispatch('loadEvent', this.id)
  }
}
</script>
