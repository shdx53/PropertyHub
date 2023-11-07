// External libraries
// import { apiKey, messagingSenderId, appId, measurementId } from "../config.js";
import "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStripePayments } from "@stripe/firestore-stripe-payments";

// import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// require("dotenv").config();

const firebaseConfig = {
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const firebaseAuth = getAuth(app);
const storage = getStorage(app);

const getCurrentUser = () =>
  new Promise((resolve, reject) => {
    const unsub = onAuthStateChanged(firebaseAuth, user => {
      unsub();
      resolve(user);
    },reject);
  });


// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

const payments = getStripePayments(app,{
  productsCollection: "products",
  customersCollection: "customers",
})


export { db,getCurrentUser,storage,payments };
