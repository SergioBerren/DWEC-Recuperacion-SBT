import React, { createContext, useContext, useState } from 'react';
// createContext => Se usa para crear un contexto, que nos permitirá compartir información de autenticación entre distintos componentes.
// useContext => Permite acceder al contexto desde cualquier componente.


//Se crea el contexto AuthContext, que almacenará la información de autenticación (usuario, login, logout).
const AuthContext = createContext();


// AuthProvider es un componente proveedor que envolverá a otros componentes y les permitirá acceder al contexto.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

//es un custom hook que facilita el acceso al contexto de autenticación.
export const useAuth = () => useContext(AuthContext);
/*
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recuperarUsuario = () => {
      const localUser = localStorage.getItem('usuario');

      if (localUser) {
        return JSON.parse(localUser);
      }
      return null;
    };

    const usuarioGuardado = recuperarUsuario();
    if (usuarioGuardado) {
      setUser(usuarioGuardado);
    }

    setLoading(false);
  }, []);

  const login = (userData) => {
      setUser(userData);
      localStorage.removeItem('usuario');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('usuario');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
*/