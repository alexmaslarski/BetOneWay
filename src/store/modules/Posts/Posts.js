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
  }
}

const actions = {
  bindPosts: firestoreAction(({ bindFirestoreRef }) => {
    console.log('binded');
    
    bindFirestoreRef('posts', db.collection('posts').orderBy('bet.timeStamp', 'desc'))
  }),
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
      db.collection('posts').doc(postID).update({
        comments: firebase.firestore.FieldValue.arrayUnion(comment),
        commentCount: increment
      })
    }
  }),
  addLike: firestoreAction((context, payload) => {
    let postID = payload;
    let likedBy = auth.currentUser.uid
    const increment = firebase.firestore.FieldValue.increment(1);
    const decrement = firebase.firestore.FieldValue.increment(-1);
    // var ref = firebase.database().ref(`/posts/${postID}/likedBy`);
      db.collection('posts').doc(postID).get().then(snap => {
        console.log(snap);
        console.log(snap.data());
        let isLiked = false;
        var array = snap.data().likedBy;
        if(array.length > 0) {
          for (var i in array) {
            var value = array[i]
            if (value == likedBy){
              console.log('already liked');
              isLiked = true
            }
          }
          if (isLiked) {
            db.collection('posts').doc(postID).update({
              likedBy: firebase.firestore.FieldValue.arrayRemove(likedBy),
              likes: decrement
            })
          }else {
            db.collection('posts').doc(postID).update({
              likedBy: firebase.firestore.FieldValue.arrayUnion(likedBy),
              likes: increment
            })
          }
        }else {
          console.log('no likes');
          
          db.collection('posts').doc(postID).update({
            likedBy: firebase.firestore.FieldValue.arrayUnion(likedBy),
            likes: increment
          })
        }
      });
  })
}

export default {
  state,
  getters,
  actions
};