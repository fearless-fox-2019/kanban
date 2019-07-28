import firebase from 'firebase'
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyCbzOkYgTTgSeLWO3p6AXz1dSLIr7g9bSU",
    authDomain: "kanban-d1d00.firebaseapp.com",
    databaseURL: "https://kanban-d1d00.firebaseio.com",
    projectId: "kanban-d1d00",
    storageBucket: "",
    messagingSenderId: "403992227704",
    appId: "1:403992227704:web:5a2545877068d3f2"
  }

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

export default db

