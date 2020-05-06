<template>
  <div class="live-event-list">
    <p class="black--text subtitle-1 font-weight-medium pl-3">{{title}}</p>
      <swiper ref="mySwiper" :options="swiperOptions">
        <app-event-slider-item v-for="event in liveEventsList" :key="event.ext_game_id" :event="event"></app-event-slider-item>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import EventSliderItem from './EventSliderItem.vue';
export default {
  components: {
    'app-event-slider-item': EventSliderItem
  },
  props: {
    liveEventsList: Array,
    title: String
  },
  data () {
    return {
      swiperOptions: {
        pagination: false,
        slidesPerView: 'auto',
        spaceBetween: 12
        // Some Swiper option/callback...
      }
    }
  }
}
</script>

<style>

</style>