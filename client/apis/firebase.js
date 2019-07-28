import firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: process.env.VUE_APP_FBASE_API_KEY,
  authDomain: process.env.VUE_APP_FBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FBASE_PROJECT_ID
});

const db = firebase.firestore();

export default db;
