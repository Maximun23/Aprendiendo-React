import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import "../Css/App.css";
import { isMobile } from "react-device-detect";

const Login = ({ onLogin, onLogout }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Función que maneja el estado de autenticación
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        // Maneja la redirección después de un inicio de sesión
        const result = await getRedirectResult(auth);
        if (result?.user) {
          setUser(result.user);
          onLogin(result.user);
        }
      } catch (error) {
        console.error("Error durante la redirección:", error);
      }
    };

    handleRedirectResult();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        onLogin(currentUser);
      }
    });

    return () => unsubscribe(); // Cleanup en caso de que el componente se desmonte
  }, []);

  // Manejo del inicio de sesión
  const handleLogin = async () => {
    setLoading(true);
    try {
      if (isMobile) {
        // Para dispositivos móviles, usamos la redirección
        await signInWithRedirect(auth, googleProvider);
      } else {
        // Para escritorio, usamos el popup
        await signInWithPopup(auth, googleProvider);
      }
    } catch (error) {
      console.error("Error durante el login:", error);
    } finally {
      setLoading(false);
    }
  };

  // Manejo del cierre de sesión
  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error("Error durante logout:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <button onClick={handleLogout} disabled={loading}>
            {loading ? "Cerrando sesión..." : "Cerrar Sesión"}
          </button>
        </div>
      ) : (
        <div>
          <button onClick={handleLogin} disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
