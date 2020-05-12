import { db } from '@/helpers/firebaseConfig'
import 'firebase/firestore'
import { firestoreAction } from 'vuexfire'
const state = {
  tipsters: [],
  userLoaded: false
}

const mutations = {
}
const getters = {
  getTipsters: state => {
    return state.tipsters;
  },
  getTipstersNames: state => {
    let names = []
    state.tipsters.forEach(tipster => {
      names.push(tipster.name)
    });
    return names;
  }
}

const actions = {
  bindTipstersByProfit: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef('tipsters', db.collection('users').orderBy('totalProfit', 'desc'))
  }),
  bindTipstersByRating: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef('tipsters', db.collection('users').orderBy('avgRating', 'desc'))
  }),
  bindTipstersByName: ({ state }, payload) => {
    let index = state.tipsters.findIndex(tipster => {
      return tipster.name = payload
    })
    return state.tipsters[index]
  }
}
export default {
  state,
  mutations,
  actions,
  getters
};