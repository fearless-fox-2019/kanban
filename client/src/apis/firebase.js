import firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
    apiKey: 'AIzaSyAz7GtVUTRJTJ_qr5OJwBHQqMgR5JGO4Pw',
    authDomain: 'wacana-1f7c8.firebaseapp.com',
    projectId: 'wacana-1f7c8'
});

var db = firebase.firestore()

export default db