import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { FIREBASE_KEY } from '@env'

const firebaseConfig = {
  // Main database
  apiKey: FIREBASE_KEY,
  authDomain: 'fresh-by-apollos.firebaseapp.com',
  projectId: 'fresh-by-apollos',
  storageBucket: 'fresh-by-apollos.appspot.com',
  messagingSenderId: '713863991541',
  appId: '1:713863991541:web:891c8563cc46b812b4f5bc',

  // Backup database
  // apiKey: "AIzaSyAG-5zyer1mn9-3T4ABsAyfDKme5cbVrmo",
  // authDomain: "fresh-by-apollos-backup.firebaseapp.com",
  // projectId: "fresh-by-apollos-backup",
  // storageBucket: "fresh-by-apollos-backup.appspot.com",
  // messagingSenderId: "315276456405",
  // appId: "1:315276456405:web:43bc576a5654a947dacd5c",
  // measurementId: "G-YCM179LEBL",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.auth().setPersistence('local');
  console.log('Initialized firebase..');
} else {
  firebase.app(); // if already initialized, use that one
}

export const auth = firebase.auth();
export default firebase;
