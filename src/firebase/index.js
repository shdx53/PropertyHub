

import { apiKey, messagingSenderId, appId, measurementId } from "../config.js";
import "firebase/firestore";



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// require("dotenv").config();

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "wad2-f67fb.firebaseapp.com",
  projectId: "wad2-f67fb",
  storageBucket: "wad2-f67fb.appspot.com",
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId,
};
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
export { db };
