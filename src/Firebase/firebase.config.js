// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWqhhHuTQdwqycn0XRXF9hMOAO00V36NA",
  authDomain: "uni-food-hub-417c0.firebaseapp.com",
  projectId: "uni-food-hub-417c0",
  storageBucket: "uni-food-hub-417c0.appspot.com",
  messagingSenderId: "33168138778",
  appId: "1:33168138778:web:2d752f0a072f877f8e67a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
