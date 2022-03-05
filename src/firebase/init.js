import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDEaWFrpB187I89KfM5j5nYcCHMiRxduGI",
    authDomain: "fireblogs-74783.firebaseapp.com",
    projectId: "fireblogs-74783",
    storageBucket: "fireblogs-74783.appspot.com",
    messagingSenderId: "483885243354",
    appId: "1:483885243354:web:e4c2c810cc093d2fb7bee3"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const firebaseAuth = firebase.auth();

export { db, firebaseAuth };