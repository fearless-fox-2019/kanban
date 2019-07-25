import firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: 'AIzaSyAQbs20Kl8WVgqeFBim8s5c1V3H0xAT7JE',
  authDomain: 'kanban-e13d5.firebaseapp.com',
  databaseURL: 'https://kanban-e13d5.firebaseio.com',
  projectId: 'kanban-e13d5',
  storageBucket: 'kanban-e13d5.appspot.com',
  messagingSenderId: '771858292793',
  appId: '1:771858292793:web:d924b0dbf880cb79'
})

const db = firebase.firestore()

export default db
