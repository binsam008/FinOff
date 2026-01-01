import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD74YcR6VuLCa9TGZIZXtwJ0NviUJal67k",
  authDomain: "multi-business-crm.firebaseapp.com",
  projectId: "multi-business-crm",
  storageBucket: "multi-business-crm.firebasestorage.app",
  messagingSenderId: "106598944096",
  appId: "1:106598944096:web:4939c171587faf2000a205",
  measurementId: "G-9VHLKEKGK0"
};

const app = initializeApp(firebaseConfig);

// AUTH
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// DATABASE
export const db = getFirestore(app);
