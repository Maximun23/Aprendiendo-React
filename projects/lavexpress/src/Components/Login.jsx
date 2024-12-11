import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import "../Css/App.css";
import { isMobile } from "react-device-detect";

const Login = ({ onLogin, onLogout }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // To handle error messages

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          setUser(result.user);
          onLogin(result.user);
        }
      } catch (error) {
        console.error("Error durante la redirección:", error);
        setErrorMessage("Error al intentar autenticarte. Intenta nuevamente.");
      }
    };

    handleRedirectResult();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        onLogin(currentUser);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage(null); // Clear any previous error messages
    try {
      if (isMobile) {
        // Use redirection for mobile
        await signInWithRedirect(auth, googleProvider);
      } else {
        // Use popup for desktop
        await signInWithPopup(auth, googleProvider);
      }
    } catch (error) {
      console.error("Error durante el login:", error);
      setErrorMessage("Hubo un problema al intentar iniciar sesión. Intenta de nuevo.");
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
      setErrorMessage("Hubo un problema al intentar cerrar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* Display error message if any */}
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
