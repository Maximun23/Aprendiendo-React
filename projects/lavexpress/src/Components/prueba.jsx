import { useState } from 'react';
import '../Css/Menu.css';

const Menu = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const closeMenu = () => {
    setIsActive(false);
  };

  return (
    <div className="menu-container">
      {/* Botón para abrir el menú */}
      <button className="menu-button" onClick={toggleMenu}>
        Menú
      </button>

      {/* Menú desplegable */}
      <div className={`menu-overlay ${isActive ? 'active' : ''}`}>
        {/* Botón para cerrar el menú */}
        <button className="close-btn" onClick={closeMenu}>
          ×
        </button>

        <ul className="menu-links">
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Servicios</a></li>
          <li><a href="#">Acerca de</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;