import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/database"
import "firebase/auth"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCENKemFrGY_njgr_ZFj2r7gGsqZpiarYM",
  authDomain: "troll-need-gold-02-staging.firebaseapp.com",
  databaseURL: "https://troll-need-gold-02-staging.firebaseio.com",
  projectId: "troll-need-gold-02-staging",
  storageBucket: "troll-need-gold-02-staging.appspot.com",
  messagingSenderId: "137530880506",
  appId: "1:137530880506:web:9dd143d44cf78253863443",
  measurementId: "G-1DF84NMCBR",
}

firebase.initializeApp(firebaseConfig)
firebase.firestore()

export default firebase
