import { db, auth } from '@/helpers/firebaseConfig'
import { firestoreAction } from 'vuexfire'
import 'firebase/firestore'
import firebase from 'firebase/app'
import store from '..'
const state = {
  profileInfo: [],
  profilePosts: []
}

const mutations = {
}
const getters = {
  getProfile: state => {
    return state.profileInfo;
  },
  getBio: state => {
    return state.profileInfo.bio;
  },
  getFollowers: state => {
    return state.profileInfo.followers
  },
  getFollowing: state => {
    return state.profileInfo.following
  },
  getSubscribers: state => {
    return state.profileInfo.subscribers
  },
  getSubscribedTo: state => {
    return state.profileInfo.subscribedTo
  },
  getRating: state => {
    return state.profileInfo.rating
  },
  getAvgRating: state => {
    let avgRating = 0;
    if(state.profileInfo.rating && state.profileInfo.rating.length > 0) {
      state.profileInfo.rating.forEach(rating => {
        avgRating += rating.rate
      });
      avgRating = avgRating / state.profileInfo.rating.length;
    }
    return parseFloat(avgRating).toFixed(1)
  },
  getAvgOdd: (state, getters) => {
    let avgOdd = 0;
    if(getters.getBetHistory && getters.getBetHistory.length > 0){
      getters.getBetHistory.forEach(bet => {
        avgOdd += parseFloat(bet.totalOdd)
      });
      avgOdd = avgOdd / getters.getBetHistory.length;
    }
    return avgOdd.toFixed(2)
  },
  getProfilePosts: state => {
    return state.profilePosts
  },
  getBetHistory: state => {
    let betHistory = [];
    if(state.profilePosts && state.profilePosts.length > 0) {
      state.profilePosts.forEach(post => {
        betHistory.push(post.bet)
      });
    }
      return betHistory;
  },
  getProfit: (state, getters) => {
    let profit = 0;
    if(getters.getBetHistory && getters.getBetHistory.length > 0){
      getters.getBetHistory.forEach(bet => {
        profit += bet.profit
      });
    }
    return profit
  },
  getTotalStake: (state, getters) => {
    let stake = 0;
    if(getters.getBetHistory && getters.getBetHistory.length > 0){
    getters.getBetHistory.forEach(bet => {
      stake += bet.stake
    });
  }
    return stake
  },
  getAvgStake: (state, getters) => {
    if(getters.getTotalStake && getters.getBetHistory && getters.getBetHistory.length){
      return (getters.getTotalStake / getters.getBetHistory.length).toFixed(2)
    }
  },
  getYield: (state, getters) => {
    let getYield = 0
    if(getters.getProfit && getters.getTotalStake){
      getYield = (getters.getProfit / getters.getTotalStake) * 100
    }
    return getYield.toFixed(2)
  }
}

const actions = {
  bindProfileInfo: firestoreAction(({ bindFirestoreRef }, uid) => {
    bindFirestoreRef('profileInfo', db.collection('users').doc(uid))
    bindFirestoreRef('profilePosts', db.collection('posts').where('author.userID', '==', uid))
  }),
  followUser: firestoreAction((context, payload) => {
    let userID = payload;
    let followedBy = auth.currentUser.uid
    console.log(userID);
    console.log(followedBy);
    
    if(userID !== followedBy) {
      db.collection('users').doc(userID).update({
        followers: firebase.firestore.FieldValue.arrayUnion(followedBy)
      })
      db.collection('users').doc(followedBy).update({
        following: firebase.firestore.FieldValue.arrayUnion(userID)
      })
    }
  }),
  unfollowUser: firestoreAction((context, payload) => {
    let userID = payload;
    let followedBy = auth.currentUser.uid
    if(userID !== followedBy) {
      db.collection('users').doc(userID).update({
        followers: firebase.firestore.FieldValue.arrayRemove(followedBy)
      })
      db.collection('users').doc(followedBy).update({
        following: firebase.firestore.FieldValue.arrayRemove(userID)
      })
    }
  }),
  subscribe: firestoreAction((context, payload) => {
    let userID = payload;
    let subscribedBy = auth.currentUser.uid
    if(userID !== subscribedBy) {
      db.collection('users').doc(userID).update({
        subscribers: firebase.firestore.FieldValue.arrayUnion(subscribedBy)
      })
      db.collection('users').doc(subscribedBy).update({
        subscribedTo: firebase.firestore.FieldValue.arrayUnion(userID)
      })
    }
  }),
  unsubscribe: firestoreAction((context, payload) => {
    console.log(payload);
    let userID = payload;
    let subscribedBy = auth.currentUser.uid
    if(userID !== subscribedBy) {
      db.collection('users').doc(userID).update({
        subscribers: firebase.firestore.FieldValue.arrayRemove(subscribedBy)
      })
      db.collection('users').doc(subscribedBy).update({
        subscribedTo: firebase.firestore.FieldValue.arrayRemove(userID)
      })
    }
  }),
  updateBio: firestoreAction((context, payload) => {
    let userID = store.getters.getUser.uid
    db.collection('users').doc(userID).update({
      bio: payload
    })
  }),
  submitRating: firestoreAction((context, payload) => {
    let userID = payload.userID
    let ratedBy = store.getters.getUser.uid
    let rating = {
      rate: payload.rate,
      ratedBy
    }
    console.log(rating);
    let ratingArray
    db.collection('users').doc(userID).get().then(snap => {
      ratingArray = snap.data().rating
      let index = ratingArray.findIndex(function( rating ) {
        return rating.ratedBy === ratedBy;
      });
      if(index >=0) {
        ratingArray[index] = rating
      }else {
        ratingArray.push(rating)
      }
      console.log(ratingArray);
      console.log(index);
      
    }).finally(() => {
      db.collection('users').doc(userID).update({
        rating: ratingArray
      })
    })
  })
}
export default {
  state,
  mutations,
  actions,
  getters
};