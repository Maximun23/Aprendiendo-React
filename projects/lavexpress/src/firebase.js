// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3n_DA2v-7PEJ--6pEuNwahI6HjOKLfu0",
  authDomain: "lavexpress-a84d0.firebaseapp.com",
  projectId: "lavexpress-a84d0",
  storageBucket: "lavexpress-a84d0.firebasestorage.app",
  messagingSenderId: "542581373937",
  appId: "1:542581373937:web:4230e8994c1a58a1d76250",
  measurementId: "G-MHT51SPH2H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);