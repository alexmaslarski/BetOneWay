import Vue from 'vue';
import { db } from '@/helpers/firebaseConfig'
import firebase from 'firebase/app'
import 'firebase/firestore'
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
          let docRef = db.collection('users').doc(authResult.user.uid);
          docRef.get().then(function(){
              db.collection('users').doc(authResult.user.uid).update({
                lastSignIn: authResult.user.metadata.lastSignInTime
              })
          })
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
          db.collection('users').doc(authResult.user.uid).set({
            name: authResult.user.displayName,
            id: authResult.user.uid,
            photoUrl: authResult.user.photoURL,
            accountCreated: authResult.user.metadata.creationTime,
            lastSignIn: authResult.user.metadata.lastSignInTime,
          })
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
    console.log('updateUser');
  }
}
export default {
  state,
  mutations,
  actions,
  getters
};