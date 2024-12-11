import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import "../Css/App.css";
import { isMobile } from "react-device-detect";

const Login = ({ onLogin, onLogout }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state for better UX

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setLoading(true); // Set loading to true when starting login
    try {
      if (isMobile) {
        await signInWithRedirect(auth, googleProvider);
      } else {
        await signInWithPopup(auth, googleProvider);
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleLogout = async () => {
    setLoading(true); // Set loading to true when starting logout
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setLoading(false); // Reset loading state
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
