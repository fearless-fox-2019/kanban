import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD1rDYqTrwqLfHys9ux2BGPPM6o0p52qQI",
  authDomain: "kanbansaya.firebaseapp.com",
  databaseURL: "https://kanbansaya.firebaseio.com",
  projectId: "kanbansaya",
  storageBucket: "kanbansaya.appspot.com",
  messagingSenderId: "895576691314",
  appId: "1:895576691314:web:9f8740bfe190b776"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export default db