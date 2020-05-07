<template>
  <v-skeleton-loader
    :loading="loading"
    type="card, list-item@6"
  >
    <div class="event">
      <v-card tile>
        <div class="d-flex justify-space-between">
        <v-card-subtitle><app-back></app-back></v-card-subtitle>
        <v-card-subtitle>{{getEvent.game_start | moment("DD MMMM, HH:mm")}}</v-card-subtitle>
        </div>
        <v-card-subtitle class="text-center">{{getEvent.tournament_name}}</v-card-subtitle>
        <v-row no-gutters justify="space-between">
          <v-col class="text-left pl-4"><h3>{{getEvent.opp_1_name}}</h3></v-col>
          <v-col class="text-center px-3">
            <h3><span v-if="getEvent.in_play">{{homeScore}}</span> - <span v-if="getEvent.in_play">{{awayScore}}</span></h3>
            <p v-if="getEvent.in_play" class="error--text">{{getEvent.timer | moment("m")}}'</p>
          </v-col>
          <v-col class="text-right pr-4"><h3>{{getEvent.opp_2_name}}</h3></v-col>
        </v-row>
      </v-card>
      <app-event-markets
      :markets="getMarkets"
      ></app-event-markets>
    </div>
  </v-skeleton-loader>
</template>

<script>
import { mapGetters } from 'vuex';
import EventMarkets from '@/components/SingleEvent/EventMarkets.vue';
export default {
  name: 'Event',
  components: {
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
    ]),
    homeScore () {
      return this.getEvent.score_full.substring(0, this.getEvent.score_full.indexOf(':'));
    },
    awayScore () {
      return this.getEvent.score_full.substring(this.getEvent.score_full.indexOf(':') + 1);
    }
  },
  created() {
    this.$store.dispatch('loadEvent', this.id)
      .then(() => {
        this.loading = false;
    })
  }
}
</script>
