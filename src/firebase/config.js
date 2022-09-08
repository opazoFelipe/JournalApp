// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmiBWhnzrmpwqGtT6mCnoJb1UMWiLnHJQ",
  authDomain: "react-cursos-372cf.firebaseapp.com",
  projectId: "react-cursos-372cf",
  storageBucket: "react-cursos-372cf.appspot.com",
  messagingSenderId: "443196035934",
  appId: "1:443196035934:web:1ba293e107db357671f5cf"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB = getFirestore(FirebaseApp)

