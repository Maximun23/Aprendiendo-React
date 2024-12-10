import React, { useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";

// Configuración de Firebase (utiliza tus propias credenciales)
const firebaseConfig = {
  apiKey: "AIzaSyA3n_DA2v-7PEJ--6pEuNwahI6HjOKLfu0",
  authDomain: "lavexpress-a84d0.firebaseapp.com",
  projectId: "lavexpress-a84d0",
  storageBucket: "lavexpress-a84d0.firebasestorage.app",
  messagingSenderId: "542581373937",
  appId: "1:542581373937:web:4230e8994c1a58a1d76250",
  measurementId: "G-MHT51SPH2H",
};

// Inicializa la aplicación Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Detectar el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Función para manejar el inicio de sesión con Google
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  if (user) {
    return (
      <div>
        <h2>Bienvenido, {user.displayName}</h2>
        <img src={user.photoURL} alt="User profile" />
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Inicia sesión con Google</h2>
      <button onClick={handleLogin}>Iniciar sesión con Google</button>
    </div>
  );
};

export default Login;
