<template>
  <router-link :to="{ name: 'Event', params: { id: event.game_id }}" tag="div">
    <v-list-item>
      <v-row no-gutters justify="space-between" class="py-3">
        <v-col cols="6" class="pr-1 d-flex flex-column justify-space-between">
          <p class="subtitle-1 ma-0 text-truncate">{{ event.opp_1_name }}</p>
          <p class="subtitle-1 ma-0 text-truncate">{{ event.opp_2_name }}</p>
        </v-col>
        <v-spacer></v-spacer>
        <v-col v-if="event.timer > 0" cols="1" class="d-flex flex-column justify-center flex-shrink-0">
          <p class="error--text ma-0">{{event.timer | moment("m")}}'</p>
        </v-col>
        <v-col v-if="event.timer > 0" cols="2" class="text-center d-flex flex-column justify-space-between flex-shrink-0">
          <p class="black--text subtitle-2 ma-0">{{homeScore}}</p>
          <p class="black--text subtitle-2 ma-0">{{awayScore}}</p>
        </v-col>
        <v-col v-else cols="2" class="text-center d-flex flex-column justify-space-around flex-shrink-0">
          <p class="black--text subtitle-2 ma-0">{{event.game_start | moment("HH:MM")}}</p>
          <p class="caption ma-0 ">{{event.game_start | moment("D MMM")}}</p>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="2" class="d-flex flex-column justify-space-between flex-shrink-0">
          <p class="caption ma-0 text-center" v-for="eachWay in eachWayOdds" :key="eachWay.oc_pointer">{{ eachWay.oc_rate }}</p>
        </v-col>
      </v-row>
    </v-list-item>
  </router-link>
</template>

<script>
export default {
  props: {
    event: Object
  },
  computed: {
    eachWayOdds () {
      return this.event.game_oc_list.filter(function(obj) {
        return obj.oc_group_name.toLowerCase().includes('1x2');
      })
    },
    homeScore () {
      return this.event.score_full.substring(0, this.event.score_full.indexOf(':'));
    },
    awayScore () {
      return this.event.score_full.substring(this.event.score_full.indexOf(':') + 1);
    }
  }
}
</script>

<style>

</style>