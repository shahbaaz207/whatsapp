import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyD4-tx1qg10EZW_kOI90zbN0Xt7Jrujx4A",
    authDomain: "whatsapp-54f79.firebaseapp.com",
    databaseURL: "https://whatsapp-54f79.firebaseio.com",
    projectId: "whatsapp-54f79",
    storageBucket: "whatsapp-54f79.appspot.com",
    messagingSenderId: "1010184525999",
    appId: "1:1010184525999:web:83e8b0d822924c98419c5a"
  };
  
// Initialize Firebase
const firebaseApp=firebase.initializeApp(firebaseConfig);
 const db=firebaseApp.firestore()
const auth=firebase.auth()
const provider=new firebase.auth.GoogleAuthProvider()
export  {auth,provider}
export default db