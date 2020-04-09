<template>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ selection.eventName }}</v-list-item-title>
          <v-list-item-subtitle>{{ selection.selection }}</v-list-item-subtitle>
          <v-list-item-subtitle>{{ selection.market }}</v-list-item-subtitle>
          <v-list-item-subtitle>{{ selection.odd }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon @click="clearBetById(selection.pointer)" icon>mdi-trash-can-outline</v-icon>
        </v-list-item-action>
      </v-list-item>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    selection: Object
  },
  methods: {
    ...mapActions([
      'clearBetById'
    ])
  }
}
</script>

<style>

</style>