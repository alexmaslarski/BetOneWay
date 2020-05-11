import Vue from 'vue';
import { db } from '@/helpers/firebaseConfig'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { firestoreAction } from 'vuexfire'
const state = {
  user: null,
  userLoaded: false
}

const mutations = {
  'UPDATE_USER': (state, payload) => {
    state.user = payload;
    state.userLoaded = true;
  }
}
const getters = {
  getUser: state => {
    return state.user;
  }
}

const actions = {
  signUserUp ({dispatch}, payload) {
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        authResult => {
          dispatch('createUserInDB', authResult)
          dispatch('updateUser', authResult)
        }
      )
      .catch(
        error => {
          console.log(error)
          Vue.$toast.open({
            message: 'Unsuccessful',
            position: 'bottom',
            type: 'error',
            dismissible: true
          });
        }
      )
  },
  signUserIn ({dispatch}, payload) {
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        authResult => {
          dispatch('updateExistingUser', authResult)
          dispatch('updateUser', authResult)
        }
      )
      .catch(
        error => {
          console.log(error)
          Vue.$toast.open({
            message: 'Unsuccessful',
            position: 'bottom',
            type: 'error',
            dismissible: true
          });
        }
      )
  },
  updateUser: ({commit}, user) => {
    commit('UPDATE_USER', user);
  },
  updateExistingUser: firestoreAction((context, payload) => {
    db.collection('users').doc(payload.user.uid).update({
      lastSignIn: payload.user.metadata.lastSignInTime
    })
  }),
  createUserInDB: firestoreAction((context, payload) => {
    db.collection('users').doc(payload.user.uid).set({
      name: payload.user.displayName,
      id: payload.user.uid,
      photoUrl: payload.user.photoURL,
      accountCreated: payload.user.metadata.creationTime,
      lastSignIn: payload.user.metadata.lastSignInTime,
      totalOdds: 0,
      totalProfit: 0,
      totalStake: 0,
      yield: 0,
      avgOdds: 0,
      avgStake: 0,
      avgRating: 0,
      bio: '',
      followers: [],
      following: [],
      subscribers: [],
      subscribedTo: [],
      posts: [],
      rating: [],
    })
  })
}
export default {
  state,
  mutations,
  actions,
  getters
};