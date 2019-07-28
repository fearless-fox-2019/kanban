require('dotenv').config()
import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAiBE-jyprVdoNHl7rrfaQcspx2aGaMHn8",
  authDomain: "kanbanforyou.firebaseapp.com",
  projectId: "kanbanforyou"
}

firebase.initializeApp(firebaseConfig)

let db = firebase.firestore()

export default db
