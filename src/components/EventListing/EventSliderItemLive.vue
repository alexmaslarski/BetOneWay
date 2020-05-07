<template>
  <swiper-slide>
    <router-link :to="{ name: 'Event', params: { id: event.game_id }}" tag="div">
    <v-card>
      <v-list-item>
        <v-list-item-content>
        <div>
          <v-chip small color="error" class="white--text font-weight-medium">{{event.timer | moment("m")}}'</v-chip>
        </div>

        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text class="black--text">{{homeScore}} : {{awayScore}}</v-list-item-action-text>
          <!-- <v-list-item-action-text class="black--text">{{awayScore}}</v-list-item-action-text> -->
        </v-list-item-action>
      </v-list-item>
    <v-divider></v-divider>
    <v-list-item three-line>
      <v-list-item-content>
        <p class="secondary--text subtitle-2 mb-3 text-truncate">{{event.tournament_name}}</p>
        <p class="black--text font-weight-menium subtitle-1 mb-3 text-truncate">{{event.opp_1_name}}</p>
        <p class="black--text font-weight-menium subtitle-1 mb-0 text-truncate">{{event.opp_2_name}}</p>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item class="pb-3 pt-1">
        <v-list-item-content class="py-0">
          <v-row v-if="eachWayOdds.length > 0" class="mx-0" justify="space-between">
            <div v-for="(odd, index) in eachWayOdds" :key="odd.oc_pointer" class="text-center">
              <v-list-item-subtitle v-if="index === 0" class="mb-1 caption text--secondary">1</v-list-item-subtitle>
              <v-list-item-subtitle v-if="index === 1" class="mb-1 caption text--secondary">X</v-list-item-subtitle>
              <v-list-item-subtitle v-if="index === 2" class="mb-1 caption text--secondary">2</v-list-item-subtitle>
              <v-chip small>{{ odd.oc_rate }}</v-chip>
            </div>
          </v-row>
            <p v-else>No odds information</p>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    </router-link>
  </swiper-slide>
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

<style lang="scss" scoped>
.swiper-slide {
  width: 200px;
  padding: 5px 0;
}

</style>