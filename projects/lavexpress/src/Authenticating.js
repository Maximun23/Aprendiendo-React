import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

const iniciarSesionConGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Usuario autenticado: ", result.user);
  } catch (e) {
    console.error("Error iniciando sesión: ", e);
  }
};
