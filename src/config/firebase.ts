// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzGpv8_BAZKZBfH2xa5Jv_YA_isqgOB6k",
  authDomain: "connectify-app-6aa9f.firebaseapp.com",
  projectId: "connectify-app-6aa9f",
  storageBucket: "connectify-app-6aa9f.appspot.com",
  messagingSenderId: "628980295064",
  appId: "1:628980295064:web:b960bf722fe6c96241f7ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//we can then import {app} in other files to use the features offered by Firebase
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
//auth = authentication data + handling , provider = method of authentication
export const db = getFirestore(app);