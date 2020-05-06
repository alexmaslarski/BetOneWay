<template>
  <router-link :to="{ name: 'Event', params: { id: event.game_id }}" tag="tr">
    <td>{{ event.game_start | moment("DD MMMM, HH:mm")}}</td>
    <td>
      <tr>{{ event.opp_1_name }}</tr>
      <tr>{{ event.opp_2_name }}</tr>
    </td>
    <td>
      <tr
      v-for="eachWay in eachWayOdds"
      :key="eachWay.oc_pointer"
      >
        {{ eachWay.oc_rate }}
      </tr>
    </td>
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
    }
  }
}
</script>

<style>

</style>