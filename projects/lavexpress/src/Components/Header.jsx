import { useState } from 'react';
import logo from "../assets/images/logo.png";
import "../Css/Header.css";

const Header = () => {
  const [isActive, setIsActive] = useState(false); // Estado para mostrar/ocultar los enlaces

  // Función para mostrar u ocultar el menú
  const toggleLinks = () => {
    setIsActive(!isActive);
  };

  // Función para cerrar el menú
  const closeLinks = () => {
    setIsActive(false);
  };

  return (
    <header>
      <div className="header-left">
        <a href="">
          <img src={logo} alt="logo de la compañía" className="logo-img" />
        </a>
        <h2 className="nombre-empresa">Lavexpress</h2>
      </div>
      <div className="link-container">
        <button className="hover-link" onClick={toggleLinks}>Usuario</button>
        
        {/* Contenedor con fondo negro que aparece cuando se activa */}
        <div className={`hover-content ${isActive ? 'active' : ''}`}>
          <button className="close-btn" onClick={closeLinks}>×</button>
          <ul>
            <li><a href="">Pedidos</a></li>
            <li><a href="prueba.html">Configuración</a></li>
            <li><a href="">Claro|Oscuro</a></li>
            <li><a href="">Cerrar sesión</a></li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;