
import ServicePlans from './ServicePlans';  // Importa el componente ServicePlans

const ContentSection = ({ id, title, content, active }) => {
  return (
    <section
      className={`content-container ${active === id ? "active" : "hidden"}`}
      id={id}
    >
      <h2>{title}</h2>
      <p>{content}</p>

      { id === "services" && active === id && (
  <ServicePlans />  // Aquí se inserta el componente de planes de servicio
)}

      {/* Solo mostrar la lista de localidades si la sección está activa */}
      {id === "locations" && active === id && (
        <ul className="locations">
          <li>El Prado</li>
          <li>Bellavista</li>
          <li>Riomar</li>
          <li>San Felipe</li>
          {/* Aquí sigue la lista de localidades */}
        </ul>
      )}
    </section>
  );
};

export default ContentSection;