import firebase from "firebase";
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAgONxsdW9mwLIIFXjLjjcGbvyVW3F52Do",
    authDomain: "classic-e01aa.firebaseapp.com",
    projectId: "classic-e01aa",
    storageBucket: "classic-e01aa.appspot.com",
    messagingSenderId: "262206222866",
    appId: "1:262206222866:web:3615bf15ba3a7586281ecb"
}

// firebase.initializeApp(firebaseConfig)

export default firebase.initializeApp(firebaseConfig)