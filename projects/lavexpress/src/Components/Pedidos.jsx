import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "./firebase"; // Asegúrate de tener la configuración de Firestore
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const Pedidos = () => {
    const [user, setUser] = useState(null);
    const [Pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          setUser(currentUser); // Establecemos el usuario en el estado
        } else {
          setUser(null);
          setPedidos([]);
        }
      });
  
      return () => unsubscribe();
    }, []);
  
    // Función para obtener los pedidos desde Firestore
    const fetchPedidos = async (userId) => {
        try {
          const PedidosRef = collection(db, "Pedidos");
          const querySnapshot = await getDocs(PedidosRef);
          const PedidosData = querySnapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() })) // Incluimos el ID del documento
            .filter((pedido) => pedido.userId === userId); // Filtrar por userId
      
          // Ordenar los pedidos por el campo "createdAt" (antiguos primero)
          PedidosData.sort((a, b) => a.createdAt - b.createdAt);
      
          setPedidos(PedidosData);
        } catch (error) {
          console.error("Error fetching pedidos:", error);
        } finally {
          setLoading(false);
        }
      };
  
    useEffect(() => {
      if (user) {
        fetchPedidos(user.uid);
      }
    }, [user]);
  
    return (
        <div>
          <h2>Mis Pedidos</h2>
          {loading ? (
            <p>Cargando Pedidos...</p>
          ) : user ? (
            Pedidos.length > 0 ? (
              <ul>
                {Pedidos.map((pedido, index) => {
                  const isCustomService = pedido.serviceName === "Servicio Personalizado";
                  const price = isCustomService ? "Precio variable" : pedido.price;
      
                  return (
                    <li key={pedido.id}>
                      <p><strong>Pedido #{index + 1}</strong></p> {/* Número basado en el índice */}
                      <p><strong>Nombre: </strong>{pedido.name} {pedido.lastName}</p>
                      <p><strong>Dirección: </strong>{pedido.address}</p>
                      <p><strong>Teléfono: </strong>{pedido.phone}</p>
                      <p><strong>Servicio: </strong>{pedido.serviceName}</p>
                      <p><strong>Fecha: </strong>{pedido.date}</p>
                      <p><strong>Hora: </strong>{pedido.time}</p>
                      <p><strong>Precio: </strong>{price}</p>
                      <p><strong>Cantidad de días: </strong>{pedido.customDays || 'N/A'}</p>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>No tienes pedidos.</p>
            )
          ) : (
            <p>Por favor, inicia sesión para ver tus pedidos.</p>
          )}
        </div>
      );
  };
  
  export default Pedidos;
  