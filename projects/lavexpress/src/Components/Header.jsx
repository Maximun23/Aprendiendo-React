const Header = () => {
  return (
    <header>
      <a href="#" className="logo">
        <img
          src="/src/assets/images/logo.png"
          alt="logo de la compañia"
          className="logo-img"
        />
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
