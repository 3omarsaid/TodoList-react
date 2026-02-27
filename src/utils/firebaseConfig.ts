// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_u82UY1UOnNdcRza6kkKg68Ebw3z9tOU",
  authDomain: "todolist-db0cf.firebaseapp.com",
  projectId: "todolist-db0cf",
  storageBucket: "todolist-db0cf.firebasestorage.app",
  messagingSenderId: "4537568309",
  appId: "1:4537568309:web:c8e677c7d25e925552757c",
  measurementId: "G-RNDF0304TE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);