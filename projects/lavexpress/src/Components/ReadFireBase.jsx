import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from './firebase'; // Tu configuración de Firebase aquí

const auth = getAuth(app);
const db = getFirestore(app);

const Perfil = () => {
  const [userData, setUserData] = useState(null);

  // Cargar los datos del perfil al iniciar sesión
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const loadUserProfile = async () => {
        const userRef = doc(db, 'Usuarios', user.uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      };
      loadUserProfile();
    }
  }, []);

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      {userData ? (
        <div>
          <p>Nombre: {userData.nombre}</p>
          <p>Apellido: {userData.apellido}</p>
          <p>Teléfono: {userData.telefono}</p>
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
    </div>
  );
};

export default Perfil;
