import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useHistory } from 'react-router-dom'; // Para redirigir a la página de perfil

const auth = getAuth();

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      history.push('/perfil'); // Redirigir a la página de perfil después del login
    } catch (error) {
      console.error("Error de inicio de sesión: ", error.message);
    }
  };

  return (
    <div>
      <h1>Iniciar sesión</h1>
      <input 
        type="email" 
        placeholder="Correo electrónico" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Contraseña" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
};

export default Login;
