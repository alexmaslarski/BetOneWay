<template>
  <swiper-slide>
    <v-card>
      <v-list-item>
        <v-list-item-content>
        <div>
          <v-chip small color="error" class="white--text">{{event.timer | moment("m")}}'</v-chip>
        </div>

        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text class="black--text">{{event.game_start | moment("HH:MM")}}</v-list-item-action-text>
          <v-list-item-action-text>{{event.game_start | moment("D MMM YYYY")}}</v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>
    <v-divider></v-divider>
    <v-list-item>
      <v-list-item-content>
          <p class="secondary--text subtitle-2 mb-3">{{event.tournament_name}}</p>
          <p class="black--text font-weight-menium subtitle-1 mb-3">{{event.opp_1_name}}</p>
          <p class="black--text font-weight-menium subtitle-1 mb-0">{{event.opp_2_name}}</p>
        </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item class="py-3">
        <v-list-item-content>
          <v-row v-if="eachWayOdds.length > 0" class="mx-0" justify="space-between">
            <div class="text-center">
              <v-list-item-subtitle class="mb-1 caption text--secondary">1</v-list-item-subtitle>
              <v-chip small>{{ eachWayOdds[0].oc_rate }}</v-chip>
            </div>
            <div class="text-center">
              <p class="mb-1 caption text--secondary">X</p>
              <v-chip small>{{eachWayOdds[1].oc_rate}}</v-chip>
            </div>
            <div class="text-center">
              <p class="mb-1 caption text--secondary">2</p>
              <v-chip small>{{eachWayOdds[2].oc_rate}}</v-chip>
            </div>
          </v-row>
            <p v-else>No odds information</p>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </swiper-slide>
</template>

<script>
export default {
  props: {
    event: Array
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

<style lang="scss" scoped>
.swiper-slide {
  width: 200px;
}

</style>