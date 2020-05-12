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
        <v-tabs color="success" centered grow class="px-4" v-model="tab">
          <v-tab>Markets</v-tab>
          <v-tab>Tips</v-tab>
          <v-tab disabled>Statistics</v-tab>
        </v-tabs>
      </v-card>
      <v-tabs-items class="secondary lighten-1" v-model="tab">
        <v-tab-item>
          <app-event-markets :markets="getMarkets"></app-event-markets>
        </v-tab-item>
        <v-tab-item>
          <v-container>
            <app-post v-for="post in getEventPosts" :key="post.id" :post="post"></app-post>
          </v-container>
        </v-tab-item>
        <v-tab-item disabled>
          <h2>Tab 3</h2>
        </v-tab-item>
      </v-tabs-items>
      
    </div>
  </v-skeleton-loader>
</template>

<script>
import { mapGetters } from 'vuex';
import EventMarkets from '@/components/SingleEvent/EventMarkets.vue';
import SinglePost from '@/components/Posts/SinglePost.vue';
export default {
  name: 'Event',
  components: {
    'app-event-markets': EventMarkets,
    'app-post': SinglePost
  },
  data() {
    return {
      id: this.$route.params.id,
      loading: true,
      tab: null
    }
  },
  watch: {
    '$route'(to) {
      this.id = to.params.id;
      console.log('watch');
      
      this.updateEvent()
    }
  },
  computed: {
    ...mapGetters([
      'getEvent',
      'getMarkets',
      'getEventPosts'
    ]),
    homeScore () {
      return this.getEvent.score_full.substring(0, this.getEvent.score_full.indexOf(':'));
    },
    awayScore () {
      return this.getEvent.score_full.substring(this.getEvent.score_full.indexOf(':') + 1);
    }
  },
  methods: {
    updateEvent() {
      this.$store.dispatch('loadEvent', this.id)
      .then(() => {
        this.loading = false;
    })
    },
  },
  created() {
    console.log(this.id);
    
    this.updateEvent()
  }
}
</script>
