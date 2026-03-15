// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZj4vBF-ziwStBbe1oooePpkPW8KRjxwQ...",
  authDomain: "mayu-moving-project.firebaseapp.com",
  projectId: "mayu-moving-project",
  storageBucket: "mayu-moving-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:..."
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
