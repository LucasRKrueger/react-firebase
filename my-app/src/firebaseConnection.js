import firebase from 'firebase/app'
import 'firebase/firestore'

let firebaseConfig = {
    apiKey: "AIzaSyATD6ggCiI6XCG_BKohKPCsv7ohfNqQrLk",
    authDomain: "cursoapp-4ec4c.firebaseapp.com",
    projectId: "cursoapp-4ec4c",
    storageBucket: "cursoapp-4ec4c.appspot.com",
    messagingSenderId: "781145732240",
    appId: "1:781145732240:web:880d728167b3b5e41a1415"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}

export default firebase;