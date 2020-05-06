<template>
  <app-event-list></app-event-list>
</template>

<script>
import EventList from '@/components/EventListing/EventList.vue';
export default {
  name: 'AllEvents',
  components: {
    'app-event-list': EventList
  }
}
</script>

<style>

</style>