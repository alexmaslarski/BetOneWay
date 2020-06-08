import { db, auth } from '@/helpers/firebaseConfig'
import { firestoreAction } from 'vuexfire'
import firebase from 'firebase/app'
import 'firebase/firestore'

const actions = {
  // places bet / creates post
  createPost: firestoreAction((context, payload) => {
    // this function simulates the bet, in order to make statistics work
    // this is necessary because the api package doesn't include match results
    // so for presentation purposes I simulate the games
    // sets up post information
    if(auth.currentUser){
      let userID = auth.currentUser.uid;
      let timeStamp = new Date();
      let text = payload;
      let bet = {
        timeStamp,
        text,
      }
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
    }

  })
}

export default {
  actions
};