<template>
<div>
    <v-card light class="py-4">
      <h3 class="text-center py-4">Authentication and profile</h3>
      <iframe width="100%" height="400" src="https://www.youtube.com/embed/Ldj6aCnsU_k" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </v-card>
    <v-card light class="py-4">
      <h3 class="text-center py-4">Posts and comments</h3>
      <iframe width="100%" height="400" src="https://www.youtube.com/embed/2wXwOVv3G-0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </v-card>
    <v-card light class="py-4">
      <h3 class="text-center py-4">Tipsters</h3>
      <iframe width="100%" height="400" src="https://www.youtube.com/embed/8UAKF5UYTxk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </v-card>
    <v-card light class="py-4">
      <h3 class="text-center py-4">Events and Creating bets</h3>
      <iframe width="100%" height="400" src="https://www.youtube.com/embed/2cHLbIvAj84" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </v-card>
</div>
</template>

<script>
export default {
  name: 'Tutorial',
  
  data () {
    return {
      swiperOptions: {
        pagination: true,
        slidesPerView: 1,
      }
    }
  },
  mounted: {
    function () {
      this.$refs.videoRef.src = "@/assets/login.mp4";
      this.$refs.videoRef.play();
    }
  }
}
</script>

<style lang="scss">
.swiper-tutorial {
  .swiper-wrapper {
    padding-left: 0 !important;
  }
}
</style>