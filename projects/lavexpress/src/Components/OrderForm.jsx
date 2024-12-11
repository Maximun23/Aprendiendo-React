import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, doc, getDoc, setDoc, runTransaction } from "firebase/firestore";
import { auth } from "./firebase";
import { serverTimestamp } from "firebase/firestore";

const OrderForm = () => {
    const { serviceName } = useParams(); // Obtén el nombre del servicio desde la URL
    const location = useLocation(); // Para acceder a la URL y sus parámetros
    const queryParams = new URLSearchParams(location.search);
    const price = queryParams.get('price');
    const customDays = queryParams.get('days'); // Obtener el número de días personalizados de la URL
    const [formData, setFormData] = useState({
      name: "",
      lastName: "",
      address: "",
      phone: "",
      date: "",
      time: "",
    });
    const [orderNumber, setOrderNumber] = useState(null); // Estado para el número de pedido
    const [errorMessage, setErrorMessage] = useState(""); // Estado para mostrar mensajes de error

    // Obtener la fecha de mañana
    const getMinDate = () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split("T")[0]; // Formato yyyy-mm-dd
    };

    // Generar las opciones de hora (7 AM a 2 PM)
    const generateHours = () => {
      const hours = [];
      for (let i = 7; i <= 14; i++) {
        hours.push(`${i}:00`);
      }
      return hours;
    };

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const userId = auth.currentUser?.uid; // Obtenemos el ID del usuario logueado
      console.log("User ID:", userId);  // Verifica si el ID del usuario está disponible

      if (!userId) {
        alert("Debes iniciar sesión para realizar un pedido.");
        return;
      }

      // Validar la fecha seleccionada
      const selectedDate = new Date(formData.date);
      const minDate = new Date(getMinDate());

      if (selectedDate < minDate) {
        setErrorMessage("¡Por favor, selecciona una fecha a partir de mañana!");
        return;
      }

      // Obtener el precio del servicio (si es un servicio personalizado, usamos el precio del queryParams)
      let price = queryParams.get("price") || 0; // El precio será tomado de los parámetros URL si existe
      if (!price) {
        // Si no es un servicio personalizado, asignamos un precio por defecto según el servicio
        if (serviceName === "Servicio Básico") {
          price = 25.000; // Precio por defecto para servicio básico
        } else if (serviceName === "Servicio Avanzado") {
          price = 120.000; // Precio para el servicio avanzado
        } else if (serviceName === "Servicio Medio") {
          price = 50.000; // Precio para el servicio medio
        }
      }

      try {
        // Limpiar el mensaje de error antes de enviar
        setErrorMessage("");

        // Obtener el contador de pedidos
        const orderCounterDoc = doc(db, "orderCounter", "counter");
        const orderCounterSnapshot = await getDoc(orderCounterDoc);

        let orderNumber = 1; // Si no existe el contador, empezamos en 1

        if (orderCounterSnapshot.exists()) {
          // Si ya existe el contador, incrementamos el valor
          orderNumber = orderCounterSnapshot.data().count + 1;
        } else {
          // Si no existe el contador, lo creamos con el valor 1
          await setDoc(orderCounterDoc, { count: 1 });
        }

        // Crear el pedido con el userId, servicio, precio, número de pedido y createdAt
        const pedidoConUserId = { 
          ...formData, 
          serviceName, 
          userId, 
          orderNumber, 
          customDays, 
          price, 
          createdAt: serverTimestamp() // Agregamos el campo createdAt
        };
        console.log("Pedido con userId:", pedidoConUserId); // Verifica los datos que se van a guardar

        // Referencia a la colección de pedidos
        const PedidosRef = collection(db, "Pedidos");

        // Agregar un nuevo documento a Firestore
        await addDoc(PedidosRef, pedidoConUserId);

        // Actualizar el contador de pedidos usando transacción
        await runTransaction(db, async (transaction) => {
          const orderCounterSnapshot = await transaction.get(orderCounterDoc);
          let newCount = orderCounterSnapshot.exists() ? orderCounterSnapshot.data().count + 1 : 1;

          transaction.update(orderCounterDoc, { count: newCount });
        });

        // Asignamos el número de pedido
        setOrderNumber(orderNumber);

        alert(`Pedido enviado con éxito. ${serviceName} #${orderNumber}`);
      } catch (error) {
        console.error("Error al enviar el pedido:", error.message);
        alert(`Hubo un error al enviar el pedido: ${error.message}`);
      }
    };

    return (
      <div className="order-form">
        <h2>Pedido: {serviceName} {customDays ? ` - ${customDays}  días` : ''}</h2> {/* Muestra los días personalizados */}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Apellido:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Dirección:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Teléfono:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Campo de selección de fecha */}
          <div>
            <label>Fecha de entrega:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              min={getMinDate()} // Aseguramos que no se pueda seleccionar una fecha anterior a mañana
            />
          </div>

          {/* Campo de selección de hora */}
          <div>
            <label>Hora de entrega:</label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una hora</option>
              {generateHours().map((hour, index) => (
                <option key={index} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </div>

          {/* Mostrar la cantidad de días como no editable */}
          {customDays && (
            <div>
              <label>Cantidad de días:</label>
              <input
                type="text"
                value={customDays}
                readOnly
              />
            </div>
          )}

          {/* Mostrar el precio como no editable */}
          <div>
            <label>Precio:</label>
            <input
              type="text"
              value={`$${price.toLocaleString()}`}
              readOnly
            />
          </div>

          {/* Mostrar el mensaje de error si existe */}
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

          <button type="submit">Enviar Pedido</button>
        </form>

        {orderNumber && (
          <p>Tu número de pedido es: #{orderNumber}</p> // Muestra el número de pedido
        )}
      </div>
    );
};

export default OrderForm;
