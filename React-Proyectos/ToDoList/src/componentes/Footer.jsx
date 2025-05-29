import { useState } from "react";
import { Link } from 'react-router-dom';
import '../estilos/estiloFooter.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/politicadeprivacidad" className="nav-link">Política de privacidad</Link>
        <Link to="/terminos" className="nav-link">Términos y Condiciones</Link>
        <Link to="/contacto" className="nav-link">Contacto</Link>
      </div>
      <p className="footer-text">© 2025 TasksMaster. Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer;
