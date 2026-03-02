import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA_u82UY1UOnNdcRza6kkKg68Ebw3z9tOU",
  authDomain: "todolist-db0cf.firebaseapp.com",
  projectId: "todolist-db0cf",
  storageBucket: "todolist-db0cf.firebasestorage.app",
  messagingSenderId: "4537568309",
  appId: "1:4537568309:web:c8e677c7d25e925552757c",
  measurementId: "G-RNDF0304TE",
};

const app = initializeApp(firebaseConfig);

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});
