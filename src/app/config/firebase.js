import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/database"
import "firebase/auth"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDaAb3NresAA5R6ZwpOc9UR7B00MPQanXU",
  authDomain: "revents001.firebaseapp.com",
  databaseURL: "https://revents001.firebaseio.com",
  projectId: "revents001",
  storageBucket: "revents001.appspot.com",
  messagingSenderId: "527222668637",
  appId: "1:527222668637:web:c31d492c0780617c2d3cb4",
}
// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: "reventscourse.firebaseapp.com",
//     databaseURL: "https://reventscourse.firebaseio.com",
//     projectId: "reventscourse",
//     storageBucket: "reventscourse.appspot.com",
//     messagingSenderId: "990229111437",
//     appId: "1:990229111437:web:cb40dfdf45505da5b7f8c4"
// }

firebase.initializeApp(firebaseConfig)
firebase.firestore()

export default firebase
