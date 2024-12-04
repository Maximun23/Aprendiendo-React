import  { useState } from 'react';

const ServicePlans = () => {
  const [customDays, setCustomDays] = useState(3);
  const [customPrice, setCustomPrice] = useState(75000);

  const handleCustomDayChange = (e) => {
    const days = parseInt(e.target.value, 10);
    setCustomDays(days);
    setCustomPrice(days * 25000); // Precio por día
  };

  return (
    <div className="service-plans">
      <div className="service-plan">
        <h3>Básico</h3>
        <p>Servicio de 24 horas.</p>
        <p>$ 25.000 COP</p>
        <button>Seleccionar</button>
      </div>
      <div className="service-plan">
        <h3>Medio</h3>
        <p>Servicio de 48 horas.</p>
        <p>$ 50.000 COP</p>
        <button>Seleccionar</button>
      </div>
      <div className="service-plan">
        <h3>Pro</h3>
        <p>¡17% dto!</p>
        <p>Servicio de una semana.</p>
        <p>$ 145.000 COP</p>
        <p>¡Ahorras 30.000 COP!</p>
        <button>Seleccionar</button>
      </div>
      <div className="service-plan" id="custom-plan">
        <h3>Personalizado</h3>
        <select id="days-select" value={customDays} onChange={handleCustomDayChange}>
          <option value="3">3 días</option>
          <option value="4">4 días</option>
          <option value="5">5 días</option>
          <option value="6">6 días</option>
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