import * as firebase from "firebase"
import firestore from "firebase/firestore"

const settings = { timestampsInSnapshots: true }

const config = {
  apiKey: "AIzaSyD0GymCMY0ZfwqoEL3kwJ4ZvSMKa4VbDVI",
  authDomain: "hello-9779.firebaseapp.com",
  databaseURL: "https://hello-9779.firebaseio.com",
  projectId: "hello-9779",
  storageBucket: "hello-9779.appspot.com",
  messagingSenderId: "1059600244812"
}
firebase.initializeApp(config)

firebase.firestore().settings(settings)

export default firebase
