import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaW2txtkeO-247-6MlEkAJRutIwzVPN38", // I won't create env file for this (sorry 😊 )
  authDomain: "react-firebase-43848.firebaseapp.com",
  projectId: "react-firebase-43848",
  storageBucket: "react-firebase-43848.appspot.com",
  messagingSenderId: "554279096566",
  appId: "1:554279096566:web:848ea95dc1797c894adcd7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;