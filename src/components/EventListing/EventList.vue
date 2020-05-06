<template>
  <div class="all-event-list">
    <p class="black--text subtitle-1 font-weight-medium pl-3">All Games</p>
    <v-card v-for="tournament in allTournaments" :key="tournament.tournament_id" class="mx-auto mb-3" color="white">
      <v-card-title  class="py-3 black--text subtitle-1 font-weight-medium text-truncate">{{ tournament.tournament_name }}</v-card-title>
      <v-divider></v-divider>
      <app-event-list-item v-for="event in tournament.events_list" :key="event.game_id" :event="event"></app-event-list-item>
    </v-card>
  </div>
</template>

<script>
import EventListItem from './EventListItem.vue';
export default {
  components: {
    'app-event-list-item': EventListItem
  },
  props: {
    allTournaments: Array
  }
}
</script>

<style>

</style>