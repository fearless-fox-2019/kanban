import firebase from 'firebase/app'
import 'firebase/firestore'
// Required for side-effects
// require("firebase/firestore");
firebase.initializeApp({
  apiKey: "AIzaSyBH32Kfp1SJvy5mxC6k1BOk3C87NQdSeKo",
  authDomain: "kanban-a059f.firebaseapp.com",
  databaseURL: "https://kanban-a059f.firebaseio.com",
  projectId: "kanban-a059f",
  storageBucket: "kanban-a059f.appspot.com",
  messagingSenderId: "889426461058",
  appId: "1:889426461058:web:083257123fa5ede1"
})
const db = firebase.firestore()
export default db