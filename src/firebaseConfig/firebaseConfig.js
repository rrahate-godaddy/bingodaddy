import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDegn4ktAlSBf3myashw06ZmLugF3GobBs",
  authDomain: "bingodaddy-32597.firebaseapp.com",
  projectId: "bingodaddy-32597",
  storageBucket: "bingodaddy-32597.appspot.com",
  messagingSenderId: "977344098270",
  appId: "1:977344098270:web:bedfffc753c9c23715f74f"
};


// Initialize Firebase
export const FireApp = initializeApp(firebaseConfig);
export const Auth = getAuth(FireApp)
export const DB = getFirestore(FireApp)