import React, { useState } from "react";
import "../estilos/menu.css";
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/AuthProvider';
import { useNavigate } from 'react-router-dom';

// Componente MenuSuperior
const MenuSuperior = ({ total, productos }) => {

  const [carritoVisible, setCarritoVisible] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();


  const toggleCarrito = () => {
    setCarritoVisible(!carritoVisible);
  };

  const handleLogout = () => {
    logout();
    //localStorage.removeItem('token'); // Elimina el token
    navigate('/login');
  };

  return (
    <div className="menu-superior">
      <nav>
        <ul className="menu-list">
          {/* Logo o ícono */}
          <li className="menu-item">
            <img
              src="/imagenes/supermercado.png"
              alt="Supermercado"
              className="icono-supermercado"
            />
          </li>

          {/* Enlaces y acciones dependiendo del estado del usuario */}
          {user === null ? (
            <li className="menu-item">
              <Link to="/login">Login</Link>
            </li>
          ) : (
            <>
              <li className="menu-item">
                <Link to="/">Inicio</Link>
              </li>
              <li className="menu-item">
                <Link to="/detalle-carrito">Detalle</Link>
              </li>
              <li className="menu-item carrito-texto">
                {productos.length} productos: {total} Є
              </li>
              <li className="menu-item saludo">
                Hola, {user}
              </li>
              {/*Link a /inventario */}
              <li className="menu-item">
                <Link to="/inventario">Inventario</Link>
              </li>
              <li className="menu-item">
                <button className="btn-salir" onClick={handleLogout}>
                  Salir
                </button>
              </li>
              <li className="menu-item">
                <button className="toggle-carrito" onClick={toggleCarrito}>
                  🛒
                </button>
              </li>
              {/* Carrito desplegable */}
              <li className="menu-item carrito-productos-container">
                {carritoVisible && (
                  <div className="carrito-productos">
                    <h4>Carrito</h4>
                    {productos.length > 0 ? (
                      <ul>
                        {productos.map((producto, index) => (
                          <li key={index}>{producto}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No hay productos en el carrito.</p>
                    )}
                  </div>
                )}
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default MenuSuperior;
