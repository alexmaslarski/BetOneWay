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
  // adds a selection to the bet slip if user is authenticated
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
  // places bet / creates post
  placeBet: firestoreAction(({ state, dispatch }, payload) => {
    // this function simulates the bet, in order to make statistics work
    // this is necessary because the api package doesn't include match results
    // so for presentation purposes I simulate the games
    function concludeBet (totalOdd) {
      let rand = Math.random() * totalOdd;
      if(rand <= 1) {
        return 'Won'
      }else {
        return 'Lost'
      }
    }
    // sets up post information
    if(auth.currentUser){
      let userID = auth.currentUser.uid;
      let timeStamp = new Date();
      let totalOdd = payload.totalOdd;
      let stake = payload.stake;
      let analysis = payload.analysis;
      let paid = payload.paid;
      let live = false;
      let combo;
      let conclusion = concludeBet(totalOdd);
      let profit
      let eventIDs = []
      if(conclusion === 'Won') {
        profit = totalOdd * stake
      }else {
        profit = -stake
      }

      state.betslip.length > 1 ? combo = true : combo = false;
      state.betslip.forEach(event => {
        eventIDs.push(event.gameId)
        if(event.in_play){
          live = true;
        }
      });
      // sets up bet information
      let bet = {
        selection: state.betslip,
        timeStamp,
        totalOdd,
        stake,
        analysis,
        paid,
        live,
        combo,
        conclusion,
        profit
      }
      var userRef = db.collection('users').doc(userID);

      // updates user's profile with new statistics
      db.runTransaction(transaction => {
        return transaction.get(userRef).then(res => {
            if (!res.exists) {
                throw "Document does not exist!";
            }
            // total Posts
            let totalPosts = res.data().posts.length + 1;
            // total Profit
            let totalProfit = res.data().totalProfit + profit;

            // total Odd
            let totalOdds = res.data().totalOdds + parseFloat(totalOdd)
            // total stake
            let totalStake = res.data().totalStake + stake;

            let newAvgOdds = totalOdds / totalPosts;
            let newAvgStake = totalStake / totalPosts
            let newYield = (totalProfit / totalStake) * 100;


            // Commit to Firestore
            transaction.update(userRef, {
                yield: newYield,
                totalStake,
                avgStake: newAvgStake,
                totalProfit,
                totalOdds,
                avgOdds: newAvgOdds
            });
        })
      }).then(() => {
        // then adds the post to firebase
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
          likes: 0,
          likedBy: [],
          eventIDs
        })
        .then((docRef) => {
          // adds the post id as a field to the post
          db.collection('posts').doc(docRef.id).update({
            postID: docRef.id
          })
          // references the post in the user's document
          db.collection('users').doc(userID).update({
            posts: firebase.firestore.FieldValue.arrayUnion(docRef)
          })
        })
      })
      .then(() => {
        // then it clears the bet slip and displays a toast
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