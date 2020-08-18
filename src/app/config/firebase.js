import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/database"
import "firebase/auth"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBvEIUMp8ozrTc_kZ6-5i5Q7aOxXzF9hXU",
  authDomain: "troll-need-gold-02.firebaseapp.com",
  databaseURL: "https://troll-need-gold-02.firebaseio.com",
  projectId: "troll-need-gold-02",
  storageBucket: "troll-need-gold-02.appspot.com",
  messagingSenderId: "1034476036518",
  appId: "1:1034476036518:web:acf0c6908f6788f2d0af67",
  measurementId: "G-KDMHMY1XL4",
}
// const firebaseConfig = {
//   apiKey: "AIzaSyDaAb3NresAA5R6ZwpOc9UR7B00MPQanXU",
//   authDomain: "revents001.firebaseapp.com",
//   databaseURL: "https://revents001.firebaseio.com",
//   projectId: "revents001",
//   storageBucket: "revents001.appspot.com",
//   messagingSenderId: "527222668637",
//   appId: "1:527222668637:web:c31d492c0780617c2d3cb4",
// }

firebase.initializeApp(firebaseConfig)
firebase.firestore()

export default firebase
