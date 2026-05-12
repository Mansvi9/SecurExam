// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDYmw8KVeKNoO2pv-kut5abDt468q1Ufpw",
  authDomain: "xam-f4db8.firebaseapp.com",
  projectId: "xam-f4db8",
  storageBucket: "xam-f4db8.firebasestorage.app",
  messagingSenderId: "945059383616",
  appId: "1:945059383616:web:e8227c786b278fcf8052a5",
  measurementId: "G-228FBT1LVP"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);