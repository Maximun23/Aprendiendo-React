import { useState } from "react";
import "./App.css";
import "./carousel.css"
import "./ContentSection.css"
import Header from "./Components/Header";
import Carousel from "./Components/Carousel";
import ContentSection from "./Components/ContentSection";
import Footer from "./Components/Footer";

function App() {
  const [activeSection, setActiveSection] = useState("about-us");

  const handleButtonClick = (section) => {
    setActiveSection(section);
  };
  return (
    <div className="App">
      <Header />
      <Carousel />
      <div className="container-all">
        <div className="nav-buttons">
          <button onClick={() => handleButtonClick("about-us")}>
            Sobre Nosotros
          </button>
          <button onClick={() => handleButtonClick("services")}>
            Servicios
          </button>
          <button onClick={() => handleButtonClick("contact")}>
            Contáctanos
          </button>
          <button onClick={() => handleButtonClick("locations")}>
            Localidades
          </button>
        </div>

        <main>
          <ContentSection
            id="about-us"
            title="Sobre Nosotros"
            active={activeSection}
            content="Somos una empresa dedicada a ofrecer los mejores servicios a nuestros clientes."
          />
          <ContentSection
            id="services"
            title="Servicios"
            active={activeSection}
            content="Descripción de los planes de servicio"
          />
          <ContentSection
            id="contact"
            title="Contáctanos"
            active={activeSection}
            content="Email: contacto@empresa.com"
          />
          <ContentSection
            id="locations"
            title="Localidades"
            active={activeSection}
            content="Nuestros servicios están enfocados en el norte de Barranquilla."
          />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
