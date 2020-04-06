<template>
    <div class="event-list">
      <v-container>
      <v-card
      v-for="tournament in tournaments"
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
      </v-container>
    </div>
</template>

<script>
import axios from 'axios';
import EventItem from '@/components/EventItem.vue';
export default {
  components: {
    'app-event-item': EventItem
  },
  data() {
    return {
      tournaments: []
    }
  },
  created() {
    axios.get('/events/1/0/sub/20/line/en')
      .then(res => {
        const data = res.data.body;
        for (const key in data) {
            this.tournaments.push(data[key])
        }
        console.log(this.tournaments);
        
      })
      .catch(err => {
        console.log(err);
      })
  }
}
</script>

<style>

</style>