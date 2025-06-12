import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import ServicioUsuario from '../servicios/ServicioUsuario';
import bcrypt from 'bcryptjs';
// import axios from 'axios';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  /*const numeroAleatorio = Math.random(1* 9999)-1;
  console.log("Número aleatorio:", numeroAleatorio);*/

  const handleSubmit = async (e) => {
  
    e.preventDefault();
  
    ServicioUsuario.login(usuario,password)
      .then((response) => {
       if(response.data.length !== 0 ){        
        login(response.data[0].nombre);
        navigate('/'); 
       }else {
        
        setError("Usuario no es correcto")
       }
       
        
      })
      .catch((error) => {   
        alert(error)                 
       navigate('/login'); 
      });    
  };
/*
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
        login(usuarioEncontrado);
        navigate('/');
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error de login:", error);
      alert("Ocurrió un error al iniciar sesión");
    }
  };
*/

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;