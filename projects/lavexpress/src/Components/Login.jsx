import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import "../Css/App.css";
import { isMobile } from "react-device-detect";

const Login = ({ onLogin, onLogout }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state for better UX

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        // Firebase v9+ usa este formato modular
        const result = await getRedirectResult(auth);  // getRedirectResult ya no es un método de instancia, ahora toma el objeto auth como parámetro
        if (result?.user) {
          setUser(result.user);
          onLogin(result.user);
        }
      } catch (error) {
        console.error("Error durante la redirección:", error);
      }
    };

    handleRedirectResult(); // Llama a la función para manejar la redirección

    // También escucha los cambios de autenticación
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        onLogin(currentUser);
      }
    });

    return () => unsubscribe(); // Cleanup en caso de que el componente se desmonte
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (isMobile) {
        await signInWithRedirect(auth, googleProvider);
      } else {
        await signInWithPopup(auth, googleProvider);
      }
    } catch (error) {
      console.error("Error durante el login:", error);
    } finally {
      setLoading(false);
    }
  };

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
