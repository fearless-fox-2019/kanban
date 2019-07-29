import firebase from 'firebase/app'
import 'firebase/firestore'


var firebaseConfig = {
    apiKey: "AIzaSyBdei7Ol3soWyLi4RLkSBTcAwQ0GeH4nvU",
    authDomain: "kanban-c6cdb.firebaseapp.com",
    databaseURL: "https://kanban-c6cdb.firebaseio.com",
    projectId: "kanban-c6cdb",
    // storageBucket: "kanban-c6cdb.appspot.com",
    // messagingSenderId: "188917107598",
    // appId: "1:188917107598:web:a3ab9589165dd7c7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let db = firebase.firestore()

  export default db