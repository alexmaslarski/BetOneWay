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
    return state.profileInfo.avgRating
  },
  getAvgOdd: state => {
    return state.profileInfo.avgOdds
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
  getProfit: state => {
    return state.profileInfo.totalProfit
  },
  getTotalStake: state => {
    return state.profileInfo.totalStake
  },
  getAvgStake: state => {
    return state.profileInfo.avgStake
  },
  getYield: state => {
    return parseFloat(state.profileInfo.yield).toFixed(2)
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
    var userRef = db.collection('users').doc(userID);
    db.runTransaction(transaction => {
      return transaction.get(userRef).then(res => {
          if (!res.exists) {
              throw "Document does not exist!";
          }

          ratingArray = res.data().rating
          // check if rated
          let index = ratingArray.findIndex(function( rating ) {
            return rating.ratedBy === ratedBy;
          });
          if(index >=0) {
            ratingArray[index] = rating
          }else {
            ratingArray.push(rating)
          }
          // Compute new average rating
          let numRatings = ratingArray.length;
          let totalRating = 0
          ratingArray.forEach(rating => {
            totalRating += rating.rate
          });
          var newAvgRating = totalRating / numRatings
          // Commit to Firestore
          transaction.update(userRef, {
              rating: ratingArray,
              avgRating: newAvgRating
          });
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