// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDOeK4LyCIdrUTF-BOzJaGjkq3nQxGhL_o",
  authDomain: "tenant-management-system-d340d.firebaseapp.com",
  projectId: "tenant-management-system-d340d",
  storageBucket: "tenant-management-system-d340d.appspot.com",
  messagingSenderId: "84059234731",
  appId: "1:84059234731:web:0894e880e66fd3beb772ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and get a reference to the service
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

export { auth, db }
