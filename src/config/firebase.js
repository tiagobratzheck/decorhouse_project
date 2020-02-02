import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDtJW9j-Z2NfOSQVNfxzGlYp7M7uEP4vRY",
    authDomain: "eventos-8a8f2.firebaseapp.com",
    databaseURL: "https://eventos-8a8f2.firebaseio.com",
    projectId: "eventos-8a8f2",
    storageBucket: "eventos-8a8f2.appspot.com",
    messagingSenderId: "913865286858",
    appId: "1:913865286858:web:e7c74d4661fee209db8033"
  };

export default firebase.initializeApp(firebaseConfig);