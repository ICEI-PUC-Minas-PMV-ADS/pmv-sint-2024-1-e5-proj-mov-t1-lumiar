import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
const firebaseConfig = {
  apiKey: "AIzaSyDjRdSXWsMi8ZIfrt1qKvR744DMxGlcuxc",
  authDomain: "lumiar-7923f.firebaseapp.com",
  projectId: "lumiar-7923f",
  storageBucket: "lumiar-7923f.appspot.com",
  messagingSenderId: "586413340406",
  appId: "1:586413340406:web:a774621dcf6fcc13095ed7"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
export { firebase }
