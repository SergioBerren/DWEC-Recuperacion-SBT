import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ServicioUsuario from '../servicios/ServicioUsuario.js';
import '../estilos/estiloCrearNuevoUsuario.css';

const CrearUsuario = () => {
  const [nombre, setNombre] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  useEffect(() => {
    // Añadir clase para evitar scroll
    document.body.classList.add('crear-usuario-page');
    return () => {
      // Limpiar clase al desmontar componente
      document.body.classList.remove('crear-usuario-page');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setExito('');

    try {
      const existe = await ServicioUsuario.verificarExistenciaUsuario(nombre);
      if (existe.data.length > 0) {
        setError("El usuario ya existe");
        return;
      }

      const nuevoUsuario = {
        nombre,
        pass,
        administrador: 0,
      };

      await ServicioUsuario.crearUsuario(nuevoUsuario);
      setExito("Usuario creado exitosamente");
      setNombre('');
      setPass('');
    } catch (error) {
      console.error("Error al crear usuario:", error);
      setError("Error al crear el usuario");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Crear Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Contraseña</label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </div>
          {error && <p className="login-error">{error}</p>}
          {exito && <p className="login-success">{exito}</p>}
          <button type="submit">Crear Usuario</button>
        </form>

        <Link to="/login" className="volver-login-link">Volver al Login</Link>
      </div>
    </div>
  );
};

export default CrearUsuario;
