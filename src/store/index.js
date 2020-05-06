import Vue from 'vue'
import Vuex from 'vuex'
import events from './modules/Events'
import event from './modules/Event'
import posts from './modules/Posts/Posts'
import user from './modules/User'
import { vuexfireMutations } from 'vuexfire'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {

  },
  mutations: vuexfireMutations,
  actions: {
  },
  modules: {
    events,
    event,
    user,
    posts
  }
})
