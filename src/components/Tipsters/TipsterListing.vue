<template>
  <div class="tipster-list">
    <app-tipster-item v-for="tipster in tipsters" :key="tipster.id" :tipster="tipster"></app-tipster-item>
  </div>
</template>

<script>
import TipsterItem from '@/components/Tipsters/TipsterItem.vue';
export default {
  components: {
    'app-tipster-item': TipsterItem
  },
  props: {
    tipsters: Object
  },
}
</script>

<style>

</style>