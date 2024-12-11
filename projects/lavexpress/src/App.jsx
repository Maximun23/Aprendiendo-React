import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Css/App.css";
import "./Css/carousel.css";
import "./Css/ContentSection.css";
import "./Css/NavLinks.css";
import "./Css/Footer.css";
import Login from "./Components/Login";
import Header from "./Components/Header";
import Carousel from "./Components/Carousel";
import ContentSection from "./Components/ContentSection";
import Footer from "./Components/Footer";
import NotFound from "./Components/NotFound";
import Pedidos from "./Components/Pedidos"
import OrderForm from "./Components/OrderForm";
import { useState } from "react";

const routerConfig = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
};

function App() {
  const [activeSection, setActiveSection] = useState("about-us");

  const handleButtonClick = (section) => {
    setActiveSection(section);
  };

  const HomePage = () => (
    <>
      <Carousel />
      <div className="container-all">
        <div className="nav-buttons">
          <button 
            onClick={() => handleButtonClick("about-us")}
            className={activeSection === "about-us" ? "active" : ""}
          >
            Sobre Nosotros
          </button>
          <button 
            onClick={() => handleButtonClick("services")}
            className={activeSection === "services" ? "active" : ""}
          >
            Servicios
          </button>
          <button 
            onClick={() => handleButtonClick("contact")}
            className={activeSection === "contact" ? "active" : ""}
          >
            Contáctanos
          </button>
          <button 
            onClick={() => handleButtonClick("locations")}
            className={activeSection === "locations" ? "active" : ""}
          >
            Localidades
          </button>
        </div>
        <main>
          <ContentSection
            id="about-us"
            title="Sobre Nosotros"
            active={activeSection}
            content="Somos una empresa con más de 20 años de experiencia en alquiler de lavadoras."
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
    </>
  );



  return (
    <BrowserRouter {...routerConfig}>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pedidos" element={<Pedidos />}></Route>
          <Route path="/pedido/:serviceName" element={<OrderForm />} />
          <Route path="/pedido/:title" element={<OrderForm />} />
          <Route path="/pedido/Personalizado:customDays" element={<OrderForm />} />
          <Route path="/pedido/Basico:customDayNormal" element={<OrderForm />} />
          <Route path="/pedido/customDayMedium:customDayMedium" element={<OrderForm />} />
          <Route path="/pedido/customDayPro:customDayPro" element={<OrderForm />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;