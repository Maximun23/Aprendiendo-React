import { useState } from 'react';

// Componente para un plan individual
const ServicePlan = ({ title, description, price, buttonText, extraInfo }) => (
  <div className="service-plan">
    <h3>{title}</h3>
    {description && <p>{description}</p>}
    {price && <p>{price}</p>}
    {extraInfo && extraInfo.map((info, index) => <p key={index}>{info}</p>)}
    <button>{buttonText}</button>
  </div>
);

const ServicePlans = () => {
  const [customDays, setCustomDays] = useState(3);
  const [customPrice, setCustomPrice] = useState(75000);
  const [isOpen, setIsOpen] = useState(false);  // Para controlar el estado abierto/cerrado del select
  const [selectedOption, setSelectedOption] = useState(3); // Para controlar la opción seleccionada

  const handleCustomDayChange = (e) => {
    const days = parseInt(e.target.value, 10);
    setCustomDays(days);
    setCustomPrice(days * 25000); // Precio por día
    setIsOpen(false);  // Cerramos el select al hacer una selección
  };

  const handleSelectFocus = () => {
    setIsOpen(true); // Al abrir el select, cambiamos el estado a 'open'
  };

  const handleSelectBlur = () => {
    setIsOpen(false); // Al cerrar el select, cambiamos el estado a 'closed'
  };

  const plans = [
    {
      title: "Básico",
      description: "Servicio de 24 horas.",
      price: "$ 25.000 COP",
      buttonText: "Seleccionar",
    },
    {
      title: "Medio",
      description: "Servicio de 48 horas.",
      price: "$ 50.000 COP",
      buttonText: "Seleccionar",
    },
    {
      title: "Pro",
      description: "Servicio de una semana.",
      price: "$ 145.000 COP",
      extraInfo: ["¡17% dto!", "¡Ahorras 30.000 COP!"],
      buttonText: "Seleccionar",
    },
  ];

  return (
    <div className="service-plans">
      {plans.map((plan, index) => (
        <ServicePlan key={index} {...plan} />
      ))}
      <div className="service-plan" id="custom-plan">
        <h3>Personalizado</h3>
        <select
          id="days-select"
          value={customDays}
          onChange={handleCustomDayChange}
          onFocus={handleSelectFocus} // Detecta cuando el select recibe el enfoque
          onBlur={handleSelectBlur} // Detecta cuando el select pierde el enfoque
          className={isOpen ? 'open' : 'closed'} // Cambia la clase basada en el estado
        >
          {[3, 4, 5, 6].map((day) => (
            <option key={day} value={day}>
              {day} días
            </option>
          ))}
        </select>
        <div id="custom-price">
          <p>Servicio de <span id="custom-days">{customDays}</span> días.</p>
          <p id="price">
            Precio: $ <span id="custom-price-value">{customPrice.toLocaleString()}</span> COP
          </p>
          <button>Seleccionar</button>
        </div>
      </div>
    </div>
  );
};

export default ServicePlans;
