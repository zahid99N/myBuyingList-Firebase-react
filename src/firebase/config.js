import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAqhjKnITBQs5fuL-3QdFzmHTHM1BfmqA8",
    authDomain: "mymoney-40698.firebaseapp.com",
    projectId: "mymoney-40698",
    storageBucket: "mymoney-40698.appspot.com",
    messagingSenderId: "321394136815",
    appId: "1:321394136815:web:a7eb89a3dd374c317d6d1a"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// timestam
const timestam = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestam }