import ServicePlans from './ServicePlans';  // Importa el componente ServicePlans


const locations = [
  "El Prado",
  "Bellavista",
  "Riomar",
  "San Felipe",
  "Los Andes",
  "Altamira",
  "Miramar",
  "Alameda",
  "El Valle",
  "San Isidro",
  "Los Pinos",
  "Alameda del Río",
  "América",
  "Barlovento",
  "Barranquillita",
  "Barrio Abajo",
  "Betania",
  "Boston",
  "Campo Alegre",
  "Centro",
  "Ciudad Jardín",
  "Colombia",
  "El Boliche",
  "El Castillo",
  "El Porvenir",
  "El Recreo",
  "El Rosario",
  "El Tabor",
  "Granadillo",
  "Zona Industrial Vía 40",
  "La Bendición de Dios",
  "La Campiña",
  "La Concepción",
  "La Cumbre",
  "La Felicidad",
  "La Loma",
  "Las Colinas",
  "Las Delicias",
  "Las Mercedes",
  "Los Alpes",
  "Los Jobos",
  "Los Nogales",
  "Modelo",
  "Montecristo",
  "Nuevo Horizonte",
  "Paraíso",
  "Parque Rosado",
  "San Francisco",
  "Santa Ana",
  "Villa Country",
  "Villa Tarel",
  "Villanueva",
]
  

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
          {locations.map((location, index) =>(
            <li key={index}>{location}</li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ContentSection;