import { useState, useEffect } from "react";
import logo from "../assets/images/logo.png";
import "../Css/Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [isActive, setIsActive] = useState(false); // Estado para abrir/cerrar el menú
  const [isMobile, setIsMobile] = useState(false); // Estado para detectar móvil
  const [isDarkMode, setIsDarkMode] = useState(false); //Estado para el modo claro|oscuro

  // Detectar si es móvil al cargar o al cambiar tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Define un ancho típico para móviles
    };

    handleResize(); // Ejecuta al cargar el componente
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Detectar el modo oscuro previamente guardado en localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setIsDarkMode(true);
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  //Función para cambiar entre modo claro y oscuro
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", true);
    }
  };

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

  const closeAndDarKMode = () => {
    toggleDarkMode();
    closeLinks();
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
        >
         <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M4 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m0 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m1 5a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2z"/></svg>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          )}
          <Link to="/" onClick={closeLinks}>
            Inicio
          </Link>
          <Link to="/pedidos" onClick={closeLinks}>
            Pedidos
          </Link>
          <Link to="/menu" onClick={closeLinks}>
            Configuración
          </Link>
          <Link>
            <button onClick={closeAndDarKMode} className="mode-toggle-btn">
              {isDarkMode ? "Modo Claro" : "Modo Oscuro"}
            </button>
          </Link>
          <Link to="/login" onClick={closeLinks}>
            Iniciar sesión
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
