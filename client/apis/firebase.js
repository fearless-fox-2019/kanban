import firebase from 'firebase/app'
import 'firebase/firestore'

const config =  {
    apiKey: "AIzaSyCljrIcN99114KO6uehvNlEq6sKP54gkEo",
    authDomain: "hacktivgit-246403.firebaseapp.com",
    databaseURL: "https://hacktivgit-246403.firebaseio.com",
    projectId: "hacktivgit-246403",
    storageBucket: "hacktivgit-246403.appspot.com",
    messagingSenderId: "192469268723",
    appId: "1:192469268723:web:7571e52d45913afe"
};

firebase.initializeApp(config)

const db = firebase.firestore()
export default db