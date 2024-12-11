import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3n_DA2v-7PEJ--6pEuNwahI6HjOKLfu0",
  authDomain: "lavexpress-a84d0.firebaseapp.com",
  projectId: "lavexpress-a84d0",
  storageBucket: "lavexpress-a84d0.firebasestorage.app",
  messagingSenderId: "542581373937",
  appId: "1:542581373937:web:4230e8994c1a58a1d76250",
  measurementId: "G-MHT51SPH2H"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };
