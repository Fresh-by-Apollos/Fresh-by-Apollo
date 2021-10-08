import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtr3OW8A5usTTRiP-yDg4tWaRW1uP8ASc",
  authDomain: "fresh-by-apollos.firebaseapp.com",
  projectId: "fresh-by-apollos",
  storageBucket: "fresh-by-apollos.appspot.com",
  messagingSenderId: "713863991541",
  appId: "1:713863991541:web:891c8563cc46b812b4f5bc",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export const auth = firebase.auth();
export default firebase;

/* Notes:
  - Using older version of firebase - "firebase": "^7.20.0",
*/
