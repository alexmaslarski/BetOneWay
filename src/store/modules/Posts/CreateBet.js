import Vue from 'vue';
import { db, auth } from '@/helpers/firebaseConfig'
import { firestoreAction } from 'vuexfire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import router from '@/router/index'
const state = {
  betslip: []
};

const getters = {
  getBetSlip: state => {
    return state.betslip;
  },
  getBetSlipCount: state => {
    return state.betslip.length;
  },
  getTotalOdd: state => {
    let totalOdd = 1;
    state.betslip.forEach(bet => {
      totalOdd = totalOdd*bet.odd;
    });
    return totalOdd.toFixed(2);
  }
}

const mutations = {
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

const actions = {
  updateBetSlip: ({commit, state}, payload) => {
    if(auth.currentUser){
      if(!state.betslip.find(bet => bet.pointer === payload.pointer)){
        commit('UPDATE_BETSLIP', payload);
      }else {
        commit('CLEAR_BET', payload.pointer);
      }
    }else{
      router.push('/signin/login')
      Vue.$toast.open({
        message: 'You need to log in first',
        position: 'bottom',
        type: 'error',
        dismissible: true
      });
    }
  },
  placeBet: firestoreAction(({ state, dispatch }, payload) => {
    if(auth.currentUser){
      let userID = auth.currentUser.uid;
      let timeStamp = new Date();
      let totalOdd = payload.totalOdd;
      let stake = payload.stake;
      let analysis = payload.analysis;
      let paid = payload.paid;
      let live = false;
      let combo;
      state.betslip.length > 1 ? combo = true : combo = false;
      state.betslip.forEach(event => {
        if(event.in_play){
          live = true;
        }
      });
      let bet = {
        selection: state.betslip,
        timeStamp,
        totalOdd,
        stake,
        analysis,
        paid,
        live,
        combo
      }
      console.log(bet);
      
      db.collection('users').doc(userID).update({
        betHistory: firebase.firestore.FieldValue.arrayUnion(bet)
      })
      db.collection('posts').add({
        author: {
          name: auth.currentUser.displayName,
          userID: userID,
          email: auth.currentUser.email,
          photoUrl: auth.currentUser.photoURL
        },
        bet,
        comments: {},
        commentCount: 0,
        likes: 0
      })
      .then((docRef) => {
        db.collection('posts').doc(docRef.id).update({
          postID: docRef.id
        })
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
}

export default {
  state,
  getters,
  mutations,
  actions
};