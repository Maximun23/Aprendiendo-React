import logo from "../assets/images/logo.png";
import "../Css/Header.css";

const Header = () => {
  return (
    <header>
      <div className="header-left">
        <a href="">
          <img src={logo} alt="logo de la compañía" className="logo-img" />
        </a>
        <h2 className="nombre-empresa">Lavexpress</h2>
      </div>
      <div className="link-container">
        <button className="hover-link">Usuario</button>
        <div className="hover-content">
          <a href="">Pedidos</a>
          <a href="prueba.html">Configuración</a>
          <a href="">Claro|Oscuro</a>
          <a href="">Cerrar sesión</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
