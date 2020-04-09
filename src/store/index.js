import Vue from 'vue'
import Vuex from 'vuex'
import events from './modules/Events'
import event from './modules/Event'
import user from './modules/User'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {

  },
  mutations: {
  },
  actions: {
  },
  modules: {
    events,
    event,
    user
  }
})
