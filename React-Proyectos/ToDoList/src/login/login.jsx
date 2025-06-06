import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthProvider.jsx';
import ServicioUsuario from '../servicios/ServicioUsuario.js';
import bcrypt from 'bcryptjs';
import '../estilos/estiloLogin.css';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('login-page');
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await ServicioUsuario.getUsuarioPorNombre(usuario);
      const usuarios = response.data;

      if (usuarios.length === 0) {
        setError("Usuario o contraseña incorrectos");
        return;
      }

      const usuarioEncontrado = usuarios[0];
      const coincide = await bcrypt.compare(password, usuarioEncontrado.pass);

      if (coincide) {
        const mantenerSesion = document.getElementById("mantenerSesion").checked;
        login(usuarioEncontrado, mantenerSesion);
        navigate('/');
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error de login:", error);
      alert("Ocurrió un error al iniciar sesión");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="usuario">Usuario</label>
            <input
              id="usuario"
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="login-error">{error}</p>}
          <div className="login-checkbox">
            <input type="checkbox" id="mantenerSesion" />
            <label htmlFor="mantenerSesion">Mantener sesión iniciada</label>
          </div>
          <button type="submit">Iniciar Sesión</button>
          <p className="crear-cuenta">
            ¿No tienes cuenta? <Link to="/crear-usuario">Crea una aquí</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
