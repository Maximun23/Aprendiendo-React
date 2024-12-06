import { useState } from 'react';
import logo from "../assets/images/logo.png";
import "../Css/Header.css";
import { Link } from 'react-router-dom';  // Importar Link

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
        <Link to="/"> {/* Reemplazar <a> por <Link> */}
          <img src={logo} alt="logo de la compañía" className="logo-img" />
        </Link>
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
            <li><Link to="/pedidos">Pedidos</Link></li>  {/* Usar Link */}
            <li><Link to="/prueba">Configuración</Link></li>  {/* Usar Link */}
            <li><Link to="/claro-oscuro">Claro|Oscuro</Link></li>  {/* Usar Link */}
            <li><Link to="/cerrar-sesion">Cerrar sesión</Link></li>  {/* Usar Link */}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
