import React from 'react';
import logo from '../assets/images/logo.png'

const Footer = () => {
  return (
    <footer className="pie-pagina">
      <div className="logo-pie-pagina">
        <img src="src/assets/images/logo.png" alt="logo de la compañia" className="logo-img" />
      </div>
      <div className="caja-red-social">
        <div className="red-social">
          <a href="https://www.facebook.com/profile.php?id=61552287946797" className="fa fa-facebook"></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
