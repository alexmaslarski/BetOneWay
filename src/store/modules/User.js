import Vue from 'vue';
import { db, auth } from '@/helpers/firebaseConfig'
import { firestoreAction } from 'vuexfire'
import firebase from 'firebase/app'
import 'firebase/firestore'
const state = {
  user: null,
  betslip: [],
  userInfo: []
}

const mutations = {
  'UPDATE_USER': (state, payload) => {
    state.user = payload;
  },
  'UPDATE_BETSLIP': (state, payload) => {
    state.betslip.push(payload);
  },
  'CLEAR_BETSLIP': (state) => {
    state.betslip = [];
  },
  'CLEAR_BET': (state, id) => {
    const index = state.betslip.findIndex(bet => bet.pointer === id);
    index >= 0 ? [...state.betslip.slice(0, index), ...state.betslip.slice(index + 1)] : state.betslip;
    state.betslip.splice(index,1);
  }
}
const getters = {
  getUser: state => {
    return state.user;
  },
  getBetSlip: state => {
    return state.betslip;
  },
  getBetSlipCount: state => {
    return state.betslip.length;
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
  updateBetSlip: ({commit, state}, payload) => {
    if(auth.currentUser){
      if(!state.betslip.find(bet => bet.pointer === payload.pointer)){
        commit('UPDATE_BETSLIP', payload);
      }else {
        commit('CLEAR_BET', payload.pointer);
      }
    }else{
      Vue.$toast.open({
        message: 'You need to log in first',
        position: 'bottom',
        type: 'error',
        dismissible: true
      });
    }
  },
  placeBet: firestoreAction(({ state, dispatch }) => {
    if(auth.currentUser){
      let userID = auth.currentUser.uid;
      let timeStamp = new Date();
      let bet = {
        selection: state.betslip,
        timeStamp
      }
      db.collection('users').doc(userID).update({
        betHistory: firebase.firestore.FieldValue.arrayUnion(bet)
      })
  
      .then(() => {
        dispatch('clearBetSlip')
        Vue.$toast.open({
          message: 'Bet Placed',
          position: 'bottom',
          type: 'success',
          dismissible: true
        });
      })
      .catch((err) => {
        console.log(err);
        
      });
    }else{
      Vue.$toast.open({
        message: 'You need to log in first',
        position: 'bottom',
        type: 'error',
        dismissible: true
      });
    }
  }),
  clearBetSlip: ({commit}) => {
    commit('CLEAR_BETSLIP');
  },
  clearBetById: ({commit}, id) => {
    commit('CLEAR_BET', id);
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