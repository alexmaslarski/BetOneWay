import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

axios.defaults.baseURL = 'https://sports-odds-betapi.p.rapidapi.com/v1';
axios.defaults.headers.get['x-rapidapi-host'] = 'sports-odds-betapi.p.rapidapi.com';
axios.defaults.headers.get['x-rapidapi-key'] = '6b3ce1bfcbmshb35345471eebde8p1de987jsnbffb71c8741d';
axios.defaults.headers.get['package'] = '4a788ec11cd42226e2fdcbd62253379c';

Vue.use(VueToast);
Vue.config.productionTip = false
Vue.use(require('vue-moment'));
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
