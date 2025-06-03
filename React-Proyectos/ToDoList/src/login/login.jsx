import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import ServicioUsuario from '../servicios/ServicioUsuario';
import axios from 'axios';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  
    e.preventDefault();
  
    ServicioUsuario.login(usuario,password)
      .then((response) => {
       if(response.data.length !== 0 ){        
        login(response.data[0].nombre);
        navigate('/'); 
        // let idCheck = document.getElementById("check")
        // idCheck.addEventListener("click", generarToken)
        function generarToken() {
          let token = Math.round(Math.random()*100000)
        }

        if(generarToken.token !== null) {
          console.log("Comprobar que existe el token")
          localStorage.setItem("usuario", JSON.stringify(usuario));
          localStorage.setItem("pass", JSON.stringify(password));
        }
        
       }else {
        
        setError("Usuario no es correcto")
       }
       
        
      })
      .catch((error) => {   
        alert(error)                 
       navigate('/login'); 
      });
  };

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
        <button type="submit">Login</button><br/>
        <input type="checkbox" /><label>Mantener Sesión iniciada</label>
      </form>
    </div>
  );
};

export default Login;