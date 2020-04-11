<template>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ event.eventName }}</v-list-item-title>
          <v-list-item-subtitle>{{ event.selection }}</v-list-item-subtitle>
          <v-list-item-subtitle>{{ event.market }}</v-list-item-subtitle>
          <v-list-item-subtitle>{{ event.odd }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
</template>

<script>
export default {
  props: {
    event: Object
  }
}
</script>

<style>

</style>