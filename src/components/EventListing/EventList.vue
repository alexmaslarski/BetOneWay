<template>
 <v-skeleton-loader
  :loading="loading"
  type="card-heading, list-item@3"
  >
    <div class="event-list">
          <v-card
          v-for="tournament in getAllTournaments"
          :key="tournament.tournament_id"
          max-width="100%"
          class="mx-auto"
          color="success"
          >
          <v-card-title class="white--text">{{ tournament.tournament_name }}</v-card-title>

            <v-simple-table
            class="event-group"
            :fixed-header="true"
            >
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Event</th>
                    <th>Odds</th>
                  </tr>
                </thead>
                <tbody>
                  <app-event-item
                  v-for="event in tournament.events_list"
                  :key="event.game_id"
                  :event="event"
                  >
                  </app-event-item>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
    </div>
  </v-skeleton-loader>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import EventItem from './EventItem.vue';
export default {
  components: {
    'app-event-item': EventItem
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