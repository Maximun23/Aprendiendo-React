import { useState, useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import Modal from './Modal'; // Modal importado
import '../Css/App.css';

const Login = ({ onLogin, onLogout }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // To handle error messages
  const [isModalOpen, setIsModalOpen] = useState(false); // Controlar el estado del modal

  // Para escuchar el cambio de estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        onLogin(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup
  }, []);

  // Función para manejar el login con popup
  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage(null); // Limpiar mensajes de error anteriores

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser(user);
      onLogin(user); // Callback para pasar el usuario autenticado
      setIsModalOpen(false); // Cerrar el modal después del login exitoso
    } catch (error) {
      console.error('Error durante el login:', error);
      setErrorMessage('Hubo un problema al intentar iniciar sesión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar el logout
  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      onLogout();
    } catch (error) {
      console.error('Error durante logout:', error);
      setErrorMessage('Hubo un problema al intentar cerrar sesión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {user ? (
        <div>
          <p>Bienvenido, {user.displayName}</p>
          <button onClick={handleLogout} disabled={loading}>
            {loading ? 'Cerrando sesión...' : 'Cerrar Sesión'}
          </button>
        </div>
      ) : (
        <div>
          <button onClick={() => setIsModalOpen(true)} disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión con Google'}
          </button>
        </div>
      )}

      {/* Mostrar el modal si está abierto */}
      <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <h2>Inicia sesión con Google</h2>
        <button onClick={handleLogin} disabled={loading}>
          {loading ? 'Iniciando sesión...' : 'Iniciar con Google'}
        </button>
      </Modal>
    </div>
  );
};

export default Login;