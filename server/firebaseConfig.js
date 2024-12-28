// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/app'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAV0BqFKoEro16NINezBTpXMnRBfoc-Eiw",
  authDomain: "expense-tracey.firebaseapp.com",
  projectId: "expense-tracey",
  storageBucket: "expense-tracey.firebasestorage.app",
  messagingSenderId: "949045606132",
  appId: "1:949045606132:web:7368343900a5763561d0a1",
  measurementId: "G-HJ2VVM0HJY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = firebase.auth();



//untracked