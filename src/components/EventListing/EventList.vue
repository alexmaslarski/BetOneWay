<template>
  <v-container>
  <v-skeleton-loader :loading="loading" type="card-heading, list-item@3">
    <div class="event-list">
      <v-card v-for="tournament in getAllTournaments" :key="tournament.tournament_id" class="mx-auto mb-3" color="white">
        <v-card-title  class="py-3 black--text subtitle-1 font-weight-medium">{{ tournament.tournament_name }}</v-card-title>
        <v-divider></v-divider>
        <app-event-item v-for="event in tournament.events_list" :key="event.game_id" :event="event"></app-event-item>
        <!-- <v-simple-table class="event-group">
          <template v-slot:default>
            <tbody>
              <app-event-item v-for="event in tournament.events_list" :key="event.game_id" :event="event">
              </app-event-item>
            </tbody>
          </template>
        </v-simple-table> -->
      </v-card>
    </div>
  </v-skeleton-loader>
  </v-container>
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