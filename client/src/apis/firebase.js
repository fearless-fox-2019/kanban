import firebase from 'firebase/app'
import 'firebase/firestore'
// Required for side-effects
// require("firebase/firestore");

firebase.initializeApp({
  apiKey: 'AIzaSyCPqudRRlh8EI0Zx4X9WtNLC0U1zzNaVRQ',
  authDomain: 'instromkanban.firebaseapp.com',
  projectId: 'instromkanban'
})

const db = firebase.firestore()

export default db
