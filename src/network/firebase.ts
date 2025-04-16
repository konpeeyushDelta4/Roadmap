// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHqvW2GoZG4c0mN-S27RpmK_S2ep-RFmE",
  authDomain: "epicxplorer-com.firebaseapp.com",
  projectId: "epicxplorer-com",
  storageBucket: "epicxplorer-com.appspot.com",
  messagingSenderId: "736302734195",
  appId: "1:736302734195:web:eab338f74e7d79d2924306",
  measurementId: "G-JWL8THWGRD"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);