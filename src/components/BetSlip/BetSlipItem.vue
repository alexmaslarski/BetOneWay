<template>
      <transition name="fade">
      <v-list-item class="bet-slip-item pb-6 pt-4 align-stretch">
        <v-list-item-content class="pr-2">
          <v-list-item-title class="mb-2">{{ selection.selection }}</v-list-item-title>
          <v-list-item-subtitle class="mb-2">{{ selection.market }}</v-list-item-subtitle>
          <v-list-item-subtitle class="mb-2">{{ selection.eventName }}</v-list-item-subtitle>
          <v-list-item-subtitle>{{ selection.tournament }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action class="py-3 my-0 d-flex flex-column justify-space-between">
          <v-icon color="#d7d7d7" @click="clearBetById(selection.pointer)" icon>mdi-close-circle</v-icon>
          <v-chip small color="accent" class="white--text font-weight-medium">{{selection.odd}}</v-chip>
        </v-list-item-action>
      </v-list-item>
      </transition>
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

<style lang="scss" scoped>
.bet-slip-item {
  border-bottom: 2px dashed #f6f7f9;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    bottom: -10px;
    left: -10px;
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background-color: #f0f2f5;
  }
  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    right: -10px;
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background-color: #f0f2f5;
    min-height: unset;
  }
}
</style>