import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Contacto from './paginas/Contacto.jsx';
import SobreMi from './paginas/SobreMi.jsx';
import Header from './componentes/Header.jsx';
import Footer from './componentes/Footer.jsx';
import PoliticaDePrivacidad from './paginas/PoliticaDePrivacidad.jsx';
import TerminosYCondiciones from './paginas/TerminosYCondiciones.jsx';
import TareasGenerales from "./paginas/TareasGenerales.jsx";
import MisTareas from "./paginas/MisTareas.jsx";
import Login from "./login/login.jsx";
import RutaProtegida from "./login/RutasProtegidas.jsx";
import { AuthProvider } from "./login/AuthProvider.jsx";
import CrearNuevoUsuario from "./login/CrearNuevoUsuario.jsx";

function AppContent() {
  const location = useLocation();
  const [tareasGenerales, setTareasGenerales] = React.useState([]);
  const [misTareas, setMisTareas] = React.useState(() => {
    return JSON.parse(localStorage.getItem("misTareas")) || [];
  });

  // Ocultar header/footer
  const ocultarHeaderFooter = location.pathname === "/login" || location.pathname === "/crear-usuario";

  React.useEffect(() => {
    fetch("/json/tareas.json")
      .then((res) => res.json())
      .then(setTareasGenerales)
      .catch((err) => console.error("Error al cargar tareas:", err));
  }, []);

  React.useEffect(() => {
    localStorage.setItem("misTareas", JSON.stringify(misTareas));
  }, [misTareas]);

  const agregarTarea = (tarea) => {
    if (misTareas.some((t) => t.titulo === tarea.titulo)) return;
    setMisTareas([...misTareas, { ...tarea, prioridad: "Media" }]);
  };

  const quitarTarea = (index) => {
    const nuevasTareas = [...misTareas];
    nuevasTareas.splice(index, 1);
    setMisTareas(nuevasTareas);
  };

  const actualizarPrioridad = (index, nuevaPrioridad) => {
    const nuevasTareas = [...misTareas];
    nuevasTareas[index].prioridad = nuevaPrioridad;
    setMisTareas(nuevasTareas);
  };

  return (
    <>
      {!ocultarHeaderFooter && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/crear-usuario" element={<CrearNuevoUsuario />} /> {/* ✅ NUEVA RUTA */}
        <Route
          path="/"
          element={
            <RutaProtegida>
              <TareasGenerales
                tareas={tareasGenerales}
                misTareas={misTareas}
                agregarTarea={agregarTarea}
              />
            </RutaProtegida>
          }
        />
        <Route
          path="/mistareas"
          element={
            <RutaProtegida>
              <MisTareas
                misTareas={misTareas}
                quitarTarea={quitarTarea}
                actualizarPrioridad={actualizarPrioridad}
              />
            </RutaProtegida>
          }
        />
        <Route
          path="/sobreMi"
          element={
            <RutaProtegida>
              <SobreMi />
            </RutaProtegida>
          }
        />
        <Route
          path="/contacto"
          element={
            <RutaProtegida>
              <Contacto />
            </RutaProtegida>
          }
        />
        <Route
          path="/politicadeprivacidad"
          element={
            <RutaProtegida>
              <PoliticaDePrivacidad />
            </RutaProtegida>
          }
        />
        <Route
          path="/terminos"
          element={
            <RutaProtegida>
              <TerminosYCondiciones />
            </RutaProtegida>
          }
        />
      </Routes>
      {!ocultarHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
