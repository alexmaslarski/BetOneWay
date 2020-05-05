import Vue from 'vue';
import { db, auth } from '@/helpers/firebaseConfig'
import { firestoreAction } from 'vuexfire'
import firebase from 'firebase/app'
import 'firebase/firestore'
const state = {
  user: null,
  userInfo: []
}

const mutations = {
  'UPDATE_USER': (state, payload) => {
    state.user = payload;
  }
}
const getters = {
  getUser: state => {
    return state.user;
  },
  getBetHistory: state => {
    if(state.userInfo.betHistory){
      return state.userInfo.betHistory;
    }
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
  updateUser: ({commit, dispatch}, user) => {
    commit('UPDATE_USER', user);

    if(user){
      dispatch('bindUserInfo')
    }
  },
  bindUserInfo: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('userInfo', db.collection('users').doc(auth.currentUser.uid))
  }),
  
}
export default {
  state,
  mutations,
  actions,
  getters
};