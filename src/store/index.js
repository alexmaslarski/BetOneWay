import Vue from 'vue'
import Vuex from 'vuex'
import events from './modules/Events'
import event from './modules/Event'
import posts from './modules/Posts/Posts'
import createBet from './modules/Posts/CreateBet'
import user from './modules/User'
import profile from './modules/Profile'
import tipsters from './modules/Tipsters'
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
    profile,
    posts,
    createBet,
    tipsters
  }
})
