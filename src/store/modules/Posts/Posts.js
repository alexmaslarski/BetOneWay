import { db, auth } from '@/helpers/firebaseConfig'
import { firestoreAction } from 'vuexfire'
import firebase from 'firebase/app'
import 'firebase/firestore'
const state = {
  posts: []
};

const getters = {
  getPosts: state => {
    return state.posts
  },
  getPostByID: (state) => (id) => {
    return state.posts.find(post => post.postID === id)
  },
  getPostByAuthor: (state) => (authorID) => {
    return state.posts.filter(post => post.author.userID === authorID)
  }
}

const actions = {
  bindPosts: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('posts', db.collection('posts').orderBy('bet.timeStamp', 'desc'))
  }),
  // adds a comment
  addComment: firestoreAction((context, payload) => {
    if(auth.currentUser){
      let userID = auth.currentUser.uid;
      let commentAuthor = db.collection('users').doc(userID)
      let timeStamp = new Date();
      let commentText = payload.comment;
      let postID = payload.postID;
      const increment = firebase.firestore.FieldValue.increment(1);
      let comment = {
        userID,
        commentAuthor,
        timeStamp,
        commentText
      }
      // adds the comment to the post in firebase and increments commentCount
      db.collection('posts').doc(postID).update({
        comments: firebase.firestore.FieldValue.arrayUnion(comment),
        commentCount: increment
      })
    }
  }),
  // adds a like and increments like count
  addLike: firestoreAction((context, payload) => {
    let postID = payload;
    let likedBy = auth.currentUser.uid
    const increment = firebase.firestore.FieldValue.increment(1);
    db.collection('posts').doc(postID).update({
      likedBy: firebase.firestore.FieldValue.arrayUnion(likedBy),
      likes: increment
    })
  }),
  // removes like
  removeLike: firestoreAction((context, payload) => {
    let postID = payload;
    let likedBy = auth.currentUser.uid
    const decrement = firebase.firestore.FieldValue.increment(-1);
    db.collection('posts').doc(postID).update({
      likedBy: firebase.firestore.FieldValue.arrayRemove(likedBy),
      likes: decrement
    })
  })
}

export default {
  state,
  getters,
  actions
};