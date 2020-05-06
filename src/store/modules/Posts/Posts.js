import { db } from '@/helpers/firebaseConfig'
import { firestoreAction } from 'vuexfire'
import 'firebase/firestore'
const state = {
  posts: []
};

const getters = {
  getPosts: state => {
    return state.posts
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
  actions
};