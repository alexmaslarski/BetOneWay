import { db, auth } from '@/helpers/firebaseConfig'
import { firestoreAction } from 'vuexfire'
import 'firebase/firestore'
import firebase from 'firebase/app'
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
    let totalRating = null;
    if(state.profileInfo.rating.length > 0) {
      state.profileInfo.rating.forEach(rating => {
        totalRating += rating.rate
      });
      totalRating / state.profileInfo.rating.length;
    }
    return totalRating
  },
  getProfilePosts: state => {
    return state.profilePosts
  },
  getBetHistory: state => {
    let betHistory = [];
    state.profilePosts.forEach(post => {
      betHistory.push(post.bet)
    });
      return betHistory;
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
      db.collection('user').doc(userID).update({
        followers: firebase.firestore.FieldValue.arrayUnion(followedBy)
      })
      db.collection('user').doc(followedBy).update({
        following: firebase.firestore.FieldValue.arrayUnion(userID)
      })
    }
  }),
  unfollowUser: firestoreAction((context, payload) => {
    let userID = payload;
    let followedBy = auth.currentUser.uid
    if(userID !== followedBy) {
      db.collection('user').doc(userID).update({
        followers: firebase.firestore.FieldValue.arrayRemove(followedBy)
      })
      db.collection('user').doc(followedBy).update({
        following: firebase.firestore.FieldValue.arrayRemove(userID)
      })
    }
  })
}
export default {
  state,
  mutations,
  actions,
  getters
};