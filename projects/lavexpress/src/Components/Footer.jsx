import logo from "../assets/images/logo.png"; // Ajusta la ruta según tu estructura

const Footer = () => {
  return (
    <>
      <footer className="pie-pagina">
        <div className="logo-pie-pagina">
          <img src={logo} alt="logo de la compañía" className="logo-img" />
        </div>
        <div className="caja-red-social">
          <div className="red-social">
            <a
              href="https://www.facebook.com/profile.php?id=61552287946797"
              className="fa fa-facebook"
            ></a>
          </div>
        </div>
      </footer>
      <div className="copyright">
        <span>© 2024 Lavexpress • Todos los derechos reservados</span>
      </div>
    </>
  );
};

export default Footer;
