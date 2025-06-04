import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ← NUEVO

  useEffect(() => {
    const recuperarUsuario = () => {
      const sessionUser = sessionStorage.getItem('usuario');
      const localUser = localStorage.getItem('usuario');

      if (sessionUser) {
        return JSON.parse(sessionUser);
      } else if (localUser) {
        return JSON.parse(localUser);
      }
      return null;
    };

    const usuarioGuardado = recuperarUsuario();
    if (usuarioGuardado) {
      setUser(usuarioGuardado);
    }

    setLoading(false); // ← IMPORTANTE
  }, []);

  const login = (userData, mantenerSesion = false) => {
    setUser(userData);
    const dataStr = JSON.stringify(userData);

    if (mantenerSesion) {
      localStorage.setItem('usuario', dataStr);
      sessionStorage.removeItem('usuario');
    } else {
      sessionStorage.setItem('usuario', dataStr);
      localStorage.removeItem('usuario');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('usuario');
    sessionStorage.removeItem('usuario');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
