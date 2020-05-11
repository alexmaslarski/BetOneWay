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
  }
}

const actions = {
  bindTipsters: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef('tipsters', db.collection('users'))
  }),
}
export default {
  state,
  mutations,
  actions,
  getters
};