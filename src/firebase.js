// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChRcW2t_ONpA8NqvT9gE7eeVllMdymJ_I",
  authDomain: "process-memory-management.firebaseapp.com",
  databaseURL: "https://process-memory-management-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "process-memory-management",
  storageBucket: "process-memory-management.appspot.com",
  messagingSenderId: "405440453488",
  appId: "1:405440453488:web:eaaa7f9207b8c89e290db5",
  measurementId: "G-W89K5WDC7J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
