import firebase from 'firebase'
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyBQI8rLhVHIc8lUJ9Q2HishCd_lUBvIyOI",
    authDomain: "kanbanboardfinal.firebaseapp.com",
    databaseURL: "https://kanbanboardfinal.firebaseio.com",
    projectId: "kanbanboardfinal",
    storageBucket: "",
    messagingSenderId: "564046887902",
    appId: "1:564046887902:web:9860bc00211a3248"
  };

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

export default db







