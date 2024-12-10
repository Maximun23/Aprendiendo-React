import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const obtenerUsuarios = async () => {
  const querySnapshot = await getDocs(collection(db, "usuarios"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} =>`, doc.data());
  });
};
    