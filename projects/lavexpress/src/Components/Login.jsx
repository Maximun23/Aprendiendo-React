import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "./firebase"; // Importa auth y googleProvider desde firebase
import "../Css/App.css";

const Login = ({ onLogin, onLogout }) => {
  const [user, setUser] = useState(null);

  // Usamos el auth desde el archivo firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Si el usuario está autenticado, actualizamos el estado
      } else {
        setUser(null); // Si no está autenticado, limpiamos el estado
      }
    });
    return () => unsubscribe(); // Limpiamos el listener cuando el componente se desmonta
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider); // Usamos el proveedor de Google
      onLogin(result); // Llamamos a la función onLogin con el resultado
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout(); // Llamamos a la función onLogout después de cerrar sesión
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      ) : (
        <div>
          <button onClick={handleLogin}>Iniciar Sesión</button>
        </div>
      )}
    </div>
  );
};

export default Login;
