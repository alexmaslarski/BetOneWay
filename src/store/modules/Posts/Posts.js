import { db } from '@/helpers/firebaseConfig'
import { firestoreAction } from 'vuexfire'
import 'firebase/firestore'
const state = {
  posts: []
};

const getters = {
  getPosts: state => {
    return state.tournaments
  }
}

const mutations = {
  'UPDATE_POSTS': (state, payload) => {
    state.tournaments = payload;
  }
}

const actions = {
  bindPosts: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('posts', db.collection('posts'))
  }),
}

export default {
  state,
  getters,
  mutations,
  actions
};