// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgLu6AoKkVA0Rs8NDciYyACzAwY_DAtw0",
  authDomain: "netflixgpt-a9cc7.firebaseapp.com",
  projectId: "netflixgpt-a9cc7",
  storageBucket: "netflixgpt-a9cc7.appspot.com",
  messagingSenderId: "1054977840650",
  appId: "1:1054977840650:web:5e3452dfc2626fb580f1f3",
  measurementId: "G-T5639FZ36B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
