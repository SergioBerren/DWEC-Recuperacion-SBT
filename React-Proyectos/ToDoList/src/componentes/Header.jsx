import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../login/AuthProvider.jsx';
import '../estilos/estiloHeader.css';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const refMenu = useRef();

  // Cierra el menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (refMenu.current && !refMenu.current.contains(e.target)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="nav-link">Inicio</Link>
        <Link to="/mistareas" className="nav-link">Mis Tareas</Link>
        <Link to="/sobremi" className="nav-link">Sobre Mí</Link>
      </nav>

      {user && (
        <div className="perfil-dropdown" ref={refMenu}>
          <button className="btn-foto" onClick={() => setMenuAbierto(!menuAbierto)}>
            <img
              src={user.fotoPerfil || '/default-avatar.png'}
              alt="Perfil"
              className="foto-perfil"
            />
          </button>
          {menuAbierto && (
            <div className="dropdown-menu">
              <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
