import Vue from 'vue'
import Vuex from 'vuex'
import events from './modules/Events'
import event from './modules/Event'
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
    event
  }
})
