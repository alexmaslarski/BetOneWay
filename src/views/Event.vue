<template>
  <div class="Event">
    <h2>Tournament ID: {{ tournament_id }}</h2>
    <h2>ID: {{ id }}</h2>
    <p> {{ getEvent }} </p>
    <button @click="loadEvent" >load event</button>
    <app-event-heading></app-event-heading>
    <app-event-markets></app-event-markets>
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
      tournament_id: this.$route.params.tournament_id,
      id: this.$route.params.id
    }
  },
  watch: {
    '$route'(to) {
      this.tournament_id = to.params.tournament_id
      this.id = to.params.id;
    }
  },
  computed: {
    ...mapGetters([
      'getEvent'
    ])
  },
  methods: {
    ...mapActions([
      'loadEvent'
    ])
  },
  created() {
    this.$store.dispatch('loadEvent', this.$route.params.id)
  }
}
</script>
