import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCn--5v2_dQ9dJ25236EwiyiwdvRgS-Pk4",
  authDomain: "whospital.firebaseapp.com",
  projectId: "whospital",
  storageBucket: "whospital.appspot.com",
  messagingSenderId: "549712745990",
  appId: "1:549712745990:web:99f0d81e8ae4dea619d587"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const colRef = collection(firestore, "users");

export { db, auth, firestore, colRef };