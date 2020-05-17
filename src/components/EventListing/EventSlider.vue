<template>
  <div class="event-slider">
    <div class="heading-wrapper d-flex justify-space-between">
      <p class="black--text subtitle-1 font-weight-medium pl-3">{{title}}</p>
      <router-link v-if="link" :to="{name: link}" class="secondary--text subtitle-2 font-weight-medium">SEE ALL</router-link>
    </div>
      <swiper ref="mySwiper" v-if="type==='live'" :options="swiperOptions" class="mx-n3">
        <app-event-slider-item-live v-for="event in liveEventsList" :key="event.game_id" :event="event"></app-event-slider-item-live>
      </swiper>
      <swiper ref="mySwiper" v-if="type==='regular'" :options="swiperOptions" class="mx-n3">
        <app-event-slider-item v-for="event in liveEventsList" :key="event.game_id" :event="event"></app-event-slider-item>
      </swiper>
  </div>
</template>

<script>
import EventSliderItem from './EventSliderItem.vue';
import EventSliderItemLive from './EventSliderItemLive.vue';
export default {
  components: {
    'app-event-slider-item': EventSliderItem,
    'app-event-slider-item-live': EventSliderItemLive
  },
  props: {
    liveEventsList: Array,
    title: String,
    type: String,
    link: String
  },
  data () {
    return {
      swiperOptions: {
        pagination: false,
        slidesPerView: 'auto',
        spaceBetween: 12,
        slidesOffsetAfter: 24
      }
    }
  }
}
</script>

<style lang="scss">
.swiper-wrapper {
  padding-left: 12px;
}
a {
  text-decoration: none;
}

</style>