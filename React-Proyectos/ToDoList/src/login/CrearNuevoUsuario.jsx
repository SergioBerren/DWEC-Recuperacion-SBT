import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import ServicioUsuario from '../servicios/ServicioUsuario.js';
import '../estilos/estiloCrearNuevoUsuario.css';
import bcrypt from 'bcryptjs';

const CrearUsuario = () => {
  const [nombre, setNombre] = useState('');
  const [pass, setPass] = useState('');

  useEffect(() => {
    document.body.classList.add('crear-usuario-page');
    return () => {
      document.body.classList.remove('crear-usuario-page');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const existe = await ServicioUsuario.verificarExistenciaUsuario(nombre);
      if (existe.data.length > 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El usuario ya existe',
        });
        return;
      }

      const hashedPassword = await bcrypt.hash(pass, 10);

      const nuevoUsuario = {
        nombre,
        pass: hashedPassword,
        administrador: 0,
      };

      await ServicioUsuario.crearUsuario(nuevoUsuario);

      await Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Usuario creado exitosamente',
        timer: 2000,
        showConfirmButton: false,
      });

      setNombre('');
      setPass('');
    } catch (error) {
      console.error("Error al crear usuario:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al crear el usuario',
      });
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
          <button type="submit">Crear Usuario</button>
        </form>

        <Link to="/login" className="volver-login-link">Volver al Login</Link>
      </div>
    </div>
  );
};

export default CrearUsuario;
