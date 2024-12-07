import { useState, useEffect } from "react";
import logo from "../assets/images/logo.png";
import "../Css/Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [isActive, setIsActive] = useState(false); // Estado para abrir/cerrar el menú
  const [isMobile, setIsMobile] = useState(false); // Estado para detectar móvil

  // Detectar si es móvil al cargar o al cambiar tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Define un ancho típico para móviles
    };

    handleResize(); // Ejecuta al cargar el componente
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Función para mostrar/ocultar el menú
  const toggleLinks = () => {
    setIsActive(!isActive);
  };

  // Función para cerrar el menú
  const closeLinks = () => {
    if (isMobile) {
      setIsActive(false); // Solo cerrar en móviles
    }
  };

  return (
    <header>
      <div className="header-left">
        <img src={logo} alt="logo de la compañía" className="logo-img" />
        <h2 className="nombre-empresa">Lavexpress</h2>
      </div>
      <div className="link-container">
        {/* Botón para abrir/cerrar el menú */}
        <button
          className={`hover-link ${isActive && isMobile ? "hidden" : ""}`}
          onClick={toggleLinks}
          className="hamburger-btn"
        >
          <i className="fas fa-bars"></i>a
        </button>

        {/* Menú siempre visible al hacer clic, con fondo oscuro solo en móviles */}
        <div
          className={`hover-content ${isActive ? "active" : ""} ${
            isMobile ? "mobile" : "desktop"
          }`}
        >
          {/* Botón para cerrar el menú en móviles */}
          {isMobile && isActive && (
            <button className="close-btn" onClick={closeLinks}>
              ×
            </button>
          )}
          <Link to="/pedidos" onClick={closeLinks}>
            Pedidos
          </Link>
          <Link to="/prueba" onClick={closeLinks}>
            Configuración
          </Link>
          <Link to="/claro-oscuro" onClick={closeLinks}>
            Claro|Oscuro
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;