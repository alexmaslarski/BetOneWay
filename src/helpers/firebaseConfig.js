export const config = {
  apiKey: 'AIzaSyANQe9K0pf1Ooo1V_-eNaAeiGQ5IF5QPRc',
  authDomain: 'betoneway.firebaseapp.com',
  databaseURL: 'https://betoneway.firebaseio.com',
  projectId: 'betoneway',
  storageBucket: 'betoneway.appspot.com',
  messagingSenderId: '1018065679034',
  appId: '1:1018065679034:web:d1a61f24c6f92fa949c883',
  measurementId: 'G-NZG7058J1C'
}

import firebase from 'firebase/app'
import 'firebase/firestore'

// Get a Firestore instance
export const db = firebase
  .initializeApp(config)
  .firestore()