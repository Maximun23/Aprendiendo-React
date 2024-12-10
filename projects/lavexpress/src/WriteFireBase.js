import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

const agregarUsuario = async () => {
  try {
    const docRef = await addDoc(collection(db, "usuarios"), {
      nombre: "Juan",
      edad: 25,
      activo: true,
    });
    console.log("Documento agregado con ID: ", docRef.id);
  } catch (e) {
    console.error("Error agregando documento: ", e);
  }
};
