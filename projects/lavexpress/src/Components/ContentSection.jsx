import ServicePlans from './ServicePlans';

const ContentSection = ({ id, title, content, active }) => {
  return (
    <section
      className={`content-container ${active === id ? "active" : "hidden"}`}
      id={id}
    >
      <h2>{title}</h2>
      <p>{content}</p>

      {id === "services" && activate === id && (<ServicePlans />)}

      {/* Solo mostrar la lista de localidades si la sección está activa */}
      {id === "locations" && active === id && (
        <ul className="locations">
          <li>El Prado</li>
          <li>Bellavista</li>
          <li>Riomar</li>
          <li>San Felipe</li>
          <li>Los Andes</li>
          <li>Altamira</li>
          <li>Miramar</li>
          <li>Alameda</li>
          <li>El Valle</li>
          <li>San Isidro</li>
          <li>Los Pinos</li>
          <li>Alameda del Río</li>
          <li>América</li>
          <li>Barlovento</li>
          <li>Barranquillita</li>
          <li>Barrio Abajo</li>
          <li>Betania</li>
          <li>Boston</li>
          <li>Campo Alegre</li>
          <li>Centro</li>
          <li>Ciudad Jardín</li>
          <li>Colombia</li>
          <li>El Boliche</li>
          <li>El Castillo</li>
          <li>El Porvenir</li>
          <li>El Recreo</li>
          <li>El Rosario</li>
          <li>El Tabor</li>
          <li>Granadillo</li>
          <li>Zona Industrial Vía 40</li>
          <li>La Bendición de Dios</li>
          <li>La Campiña</li>
          <li>La Concepción</li>
          <li>La Cumbre</li>
          <li>La Felicidad</li>
          <li>La Loma</li>
          <li>Las Colinas</li>
          <li>Las Delicias</li>
          <li>Las Mercedes</li>
          <li>Los Alpes</li>
          <li>Los Jobos</li>
          <li>Los Nogales</li>
          <li>Modelo</li>
          <li>Montecristo</li>
          <li>Nuevo Horizonte</li>
          <li>Paraíso</li>
          <li>Parque Rosado</li>
          <li>San Francisco</li>
          <li>Santa Ana</li>
          <li>Villa Country</li>
          <li>Villa Tarel</li>
          <li>Villanueva</li>
        </ul>
      )}
    </section>
  );
};

export default ContentSection;
