
import firebase from "firebase/compat/app";
import { getAuth } from 'firebase/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBwaBnZc5mgmu2LRIn3uz-wvXD1hdJuv68",
    authDomain: "clone-3c260.firebaseapp.com",
    projectId: "clone-3c260",
    storageBucket: "clone-3c260.firebasestorage.app",
    messagingSenderId: "47384301128",
    appId: "1:47384301128:web:8928d86c35f6029496d27d"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore()