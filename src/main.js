import "./assets/main.css"
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import firebase from "firebase/compat/app";
import { getApps ,initializeApp} from "firebase/app";
// import { getAuth,onAuthStateChange } from "firebase/auth";

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Import the functions you need from the SDKs you need

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// require("dotenv").config();

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "wad2-f67fb.firebaseapp.com",
  projectId: "wad2-f67fb",
  storageBucket: "wad2-f67fb.appspot.com",
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

initializeApp(firebaseConfig);

const app = createApp(App);

app.use(router);

app.mount("#app");
