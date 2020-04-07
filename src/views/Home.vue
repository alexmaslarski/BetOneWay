<template>
  <div class="home">
    <app-event-list></app-event-list>
  </div>
</template>

<script>
// @ is an alias to /src
import EventList from '@/components/EventListing/EventList.vue';
export default {
  name: 'Home',
  components: {
    'app-event-list': EventList
  }
}
</script>
