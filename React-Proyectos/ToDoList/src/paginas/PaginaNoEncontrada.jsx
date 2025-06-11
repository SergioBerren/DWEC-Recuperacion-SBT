import React from 'react';
import { Link } from 'react-router-dom';
import '../estilos/estiloPaginaNoEncontrada.css';

function PaginaNoEncontrada() {
  return (
    <div className="pagina-404">
      <h1>404</h1>
      <p>La página que buscas no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
}

export default PaginaNoEncontrada;
