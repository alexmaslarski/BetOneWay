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
  }
}

const actions = {
  bindPosts: firestoreAction(({ bindFirestoreRef }) => {
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
    db.collection('posts').doc(postID).update({
      likedBy: firebase.firestore.FieldValue.arrayUnion(likedBy),
      likes: increment
    })
  }),
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
//   isLiked: (context, postID) => {
//     let likedBy = auth.currentUser.uid
//     return db.collection('posts').doc(postID).get().then(snap => {
//       var likesArray = snap.data().likedBy;
//       let isLiked = false;
//       if(likesArray.length > 0) {
//         for (var i in likesArray) {
//           var value = likesArray[i]
//           if (value == likedBy){
//             isLiked = true;
//           }else {
//             isLiked = false;
//           }
//         }
//       }else {
//         isLiked =  false
//       }
//       return isLiked
//     });
//   }
// }

export default {
  state,
  getters,
  actions
};