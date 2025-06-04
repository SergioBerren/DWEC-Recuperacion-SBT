import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider.jsx';

const RutaProtegida = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Cargando sesión...</p>; // o un spinner si prefieres
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RutaProtegida;