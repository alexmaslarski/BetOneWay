<template>
  <v-card
  dark
  tile
  >
    <div class="d-flex justify-space-between">
    <v-card-subtitle>{{tournament}}</v-card-subtitle>
    <v-card-subtitle>{{date | moment("DD MMMM, HH:mm")}}</v-card-subtitle>

    </div>
    <v-card-title
    class="d-flex justify-space-between"
    >
      <span>
        {{team1}}
      </span>
      <span>
        vs.
      </span>
      <span>
        {{team2}}
      </span>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
props: {
    team1: String,
    team2: String,
    tournament: String,
    date: Number
  }
}
</script>

<style>

</style>