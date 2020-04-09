import { db, auth } from '@/helpers/firebaseConfig'
import { firestoreAction } from 'vuexfire'
import firebase from 'firebase/app'
import 'firebase/firestore'
const state = {
  user: null,
  betslip: []
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
    let removed = state.betslip.splice(index,1);
    console.log(removed);
    console.log(index);
  }
}
const getters = {
  getUser: state => {
    return state.user;
  },
  getBetSlip: state => {
    return state.betslip;
  }
}

const actions = {
  updateUser: ({commit}, user) => {
    commit('UPDATE_USER', user);
  },
  updateBetSlip: ({commit, state}, payload) => {
    if(!state.betslip.find(bet => bet.pointer === payload.pointer)){
      commit('UPDATE_BETSLIP', payload);
    }else {
      console.log("Duplicate");
    }
  },
  placeBet: firestoreAction(({ state, dispatch }) => {
    let userID = auth.currentUser.uid;
    let timeStamp = new Date();
    console.log(state.betslip);
    let bet = {
      selection: state.betslip,
      timeStamp
    }
    db.collection('users').doc(userID).update({
      betHistory: firebase.firestore.FieldValue.arrayUnion(bet)
    })
    .then(() => {
      dispatch('clearBetSlip')
      console.log('Successful');
    })
    .catch((err) => {
      console.log(err);
      
    });
  }),
  clearBetSlip: ({commit}) => {
    commit('CLEAR_BETSLIP');
  },
  clearBetById: ({commit}, id) => {
    commit('CLEAR_BET', id);
  },
}
export default {
  state,
  mutations,
  actions,
  getters
};