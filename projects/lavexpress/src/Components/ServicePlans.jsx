import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Componente para los planes de servicio
const ServicePlans = () => {
  const [customDays, setCustomDays] = useState(3);
  const [customPrice, setCustomPrice] = useState(75000);
  const [isOpen, setIsOpen] = useState(false); // Para controlar el estado abierto/cerrado del select

  const customDayNormal = 1;
  const customDayMedium = 2;
  const customDayPro = 7;
  // Estado para los otros planes
  const basicPrice = "25.000";
  const mediumPrice = "50.000";
  const proPrice = "120.000";


  const handleCustomDayChange = (e) => {
    const days = parseInt(e.target.value, 10);
    setCustomDays(days);
    setCustomPrice(days * 25000); // Precio por día
    setIsOpen(false); // Cerramos el select al hacer una selección
  };

  const handleSelectFocus = () => {
    setIsOpen(true); // Al abrir el select, cambiamos el estado a 'open'
  };

  const handleSelectBlur = () => {
    setIsOpen(false); // Al cerrar el select, cambiamos el estado a 'closed'
  };

  const navigate = useNavigate();

  const handleCustomSelect = () => {
    // Redirige a la ruta con los parámetros de días y precio en la URL
    navigate(`/pedido/Personalizado?days=${customDays}&price=${customPrice}`);
  };

  const handleBasicSelect = () => {
    navigate(`/pedido/Básico?price=${basicPrice}&days=${customDayNormal}`);
  };

  const handleMediumSelect = () => {
    navigate(`/pedido/Medio?price=${mediumPrice}&days=${customDayMedium}`);
  };

  const handleProSelect = () => {
    navigate(`/pedido/Pro?price=${proPrice}&days=${customDayPro}`);
  };

  return (
    <div className="service-plans">
      {/* Plan Básico */}
      <div className="service-plan" id="basic-plan">
        <h3>Plan Básico</h3>
        <p>Servicio básico por {customDayNormal} día.</p>
        <p>
          Precio: $ <span>{basicPrice.toLocaleString()}</span> COP
        </p>
        <button onClick={handleBasicSelect}>Seleccionar</button>
      </div>

      {/* Plan Medio */}
      <div className="service-plan" id="medium-plan">
        <h3>Plan Medio</h3>
        <p>Servicio intermedio por {customDayMedium} días.</p>
        <p>
          Precio: $ <span>{mediumPrice.toLocaleString()}</span> COP
        </p>
        <button onClick={handleMediumSelect}>Seleccionar</button>
      </div>

      {/* Plan Pro */}
      <div className="service-plan" id="pro-plan">
        <h3>Plan Semanal</h3>
        <p>Servicio avanzado por {customDayPro} días.</p>
        <p>
          Precio: $ <span>{proPrice.toLocaleString()}</span> COP
        </p>
        <button onClick={handleProSelect}>Seleccionar</button>
      </div>

      {/* Plan Personalizado */}
      <div className="service-plan" id="custom-plan">
        <h3>Personalizado</h3>
        <select
          id="days-select"
          value={customDays}
          onChange={handleCustomDayChange}
          onFocus={handleSelectFocus} // Detecta cuando el select recibe el enfoque
          onBlur={handleSelectBlur} // Detecta cuando el select pierde el enfoque
          className={isOpen ? "open" : "closed"} // Cambia la clase basada en el estado
        >
          {[3, 4, 5, 6].map((day) => (
            <option key={day} value={day}>
              {day} días
            </option>
          ))}
        </select>
        <div id="custom-price">
          <p>
            Servicio de <span id="custom-days">{customDays}</span> días.
          </p>
          <p id="price">
            Precio: ${" "}
            <span id="custom-price-value">{customPrice.toLocaleString()}</span>{" "}
            COP
          </p>
          <button onClick={handleCustomSelect}>Seleccionar</button>
        </div>
      </div>
    </div>
  );
};

export default ServicePlans;
