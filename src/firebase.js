// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbu80mnZKmrfyjei3WVVqxAiiH-vRY-aA",
  authDomain: "protech-website-38a37.firebaseapp.com",
  projectId: "protech-website-38a37",
  storageBucket: "protech-website-38a37.firebasestorage.app",
  messagingSenderId: "297624298096",
  appId: "1:297624298096:web:7f3e3ce2e496aa64f2cab5",
  measurementId: "G-X37KGDXJGN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
