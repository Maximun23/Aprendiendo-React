import { useState } from 'react';
import logo from "../assets/images/logo.png";
import "../Css/Header.css";

const Header = () => {
  const [isActive, setIsActive] = useState(false); // Estado para abrir/cerrar el contenedor

  // Función para mostrar/ocultar el menú
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
        {/* Al hacer clic en el botón "Usuario", se activa el contenedor de los links */}
        <button className="hover-link" onClick={toggleLinks}>Usuario</button>
        
        {/* El contenedor con fondo negro solo aparece cuando isActive es true */}
        <div className={`hover-content ${isActive ? 'active' : ''}`}>
          {/* Botón para cerrar */}
          <button className="close-btn" onClick={closeLinks}>×</button>
          
          <ul>
            <li><a href="">Pedidos</a></li>
            <li><a href="prueba.jsx">Configuración</a></li>
            <li><a href="">Claro|Oscuro</a></li>
            <li><a href="">Cerrar sesión</a></li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;