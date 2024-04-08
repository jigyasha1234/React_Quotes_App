// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from 'firebase/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBy7b_UdUQpV6crqSeZBuTULoqmGeVF0Tg",
  authDomain: "rosy-quote-app.firebaseapp.com",
  projectId: "rosy-quote-app",
  storageBucket: "rosy-quote-app.appspot.com",
  messagingSenderId: "264920147812",
  appId: "1:264920147812:web:d52e28a7cde309707f3c71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);