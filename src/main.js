import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import BackBtn from '@/components/UI/backButton.vue';
import VueCoreVideoPlayer from 'vue-core-video-player'

// axios.defaults.baseURL = 'https://sports-odds-betapi.p.rapidapi.com/v1';
// axios.defaults.headers.get['x-rapidapi-host'] = 'sports-odds-betapi.p.rapidapi.com';
// axios.defaults.headers.get['x-rapidapi-key'] = '6b3ce1bfcbmshb35345471eebde8p1de987jsnbffb71c8741d';
// axios.defaults.headers.get['package'] = '4a788ec11cd42226e2fdcbd62253379c';
// https://betdta.com
axios.defaults.baseURL = 'https://betdta.com/v1';
axios.defaults.headers.get['package'] = '655a50942823a0f022c2585000c71025';

Vue.use(VueCoreVideoPlayer)
Vue.component('app-back', BackBtn);
Vue.use(VueToast);
Vue.config.productionTip = false
Vue.use(require('vue-moment'));
Vue.use(VueAwesomeSwiper)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
