import { Link } from 'react-router-dom';
import '../estilos/estiloHeader.css';

function Header() {
    return (
      <header className="header">
        <nav className="nav">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/sobremi" className="nav-link">Sobre Mí</Link>
        </nav>
      </header>
    );
  }
  
  export default Header;
