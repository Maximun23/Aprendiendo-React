import logo from './src/assets/images/logo.png'

const Header = () => {
  return (
    <header>
      <a href="#" className="logo">
        <img src={logo} alt="logo de la compañía" clasName="logo-img"/>
        <p className="nombre-empresa">Lavexpress</p>
      </a>
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
