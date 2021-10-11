import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";


//firebase main
// const firebaseConfig = {
//   apiKey: "AIzaSyCtr3OW8A5usTTRiP-yDg4tWaRW1uP8ASc",
//   authDomain: "fresh-by-apollos.firebaseapp.com",
//   projectId: "fresh-by-apollos",
//   storageBucket: "fresh-by-apollos.appspot.com",
//   messagingSenderId: "713863991541",
//   appId: "1:713863991541:web:891c8563cc46b812b4f5bc",
// };

//firebase backup
const firebaseConfig = {
  apiKey: "AIzaSyAG-5zyer1mn9-3T4ABsAyfDKme5cbVrmo",
  authDomain: "fresh-by-apollos-backup.firebaseapp.com",
  projectId: "fresh-by-apollos-backup",
  storageBucket: "fresh-by-apollos-backup.appspot.com",
  messagingSenderId: "315276456405",
  appId: "1:315276456405:web:43bc576a5654a947dacd5c",
  measurementId: "G-YCM179LEBL"
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
