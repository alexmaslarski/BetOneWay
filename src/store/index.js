import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations } from 'vuexfire'
import events from './modules/Events'
import event from './modules/Event'
import user from './modules/User'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {

  },
  mutations: {
    ...vuexfireMutations,
  },
  actions: {
  },
  modules: {
    events,
    event,
    user
  }
})
