import React, { StrictMode } from "react";
import ReactDOM from 'react-dom/client';
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
import { AuthProvider, useAuth } from "./login/AuthProvider.jsx";
import CrearNuevoUsuario from "./login/CrearNuevoUsuario.jsx";

function MainApp() {
  const location = useLocation();
  const { user } = useAuth();

  const [tareasGenerales, setTareasGenerales] = React.useState([]);
  const [misTareas, setMisTareas] = React.useState([]);
  const [tareasAsignadas, setTareasAsignadas] = React.useState({});

  const ocultarHeaderFooter =
    location.pathname === "/login" || location.pathname === "/crear-usuario";

  // Cargar tareas desde JSON local
  React.useEffect(() => {
    fetch("/json/tareas.json")
      .then((res) => res.json())
      .then(setTareasGenerales)
      .catch((err) => console.error("Error al cargar tareas:", err));
  }, []);

  // Cargar tareas del usuario desde localStorage
  React.useEffect(() => {
    if (user) {
      const guardadas = localStorage.getItem(`misTareas_${user.nombre}`);
      setMisTareas(guardadas ? JSON.parse(guardadas) : []);
    }
  }, [user]);

  // Cargar tareas asignadas globales desde localStorage
  React.useEffect(() => {
    const data = localStorage.getItem("tareasAsignadas");
    setTareasAsignadas(data ? JSON.parse(data) : {});
  }, []);

  // Guardar tareas del usuario en localStorage
  React.useEffect(() => {
    if (user) {
      localStorage.setItem(`misTareas_${user.nombre}`, JSON.stringify(misTareas));
    }
  }, [misTareas, user]);

  // Guardar tareas asignadas globales en localStorage
  React.useEffect(() => {
    localStorage.setItem("tareasAsignadas", JSON.stringify(tareasAsignadas));
  }, [tareasAsignadas]);

  const agregarTarea = (tarea) => {
    if (tareasAsignadas[tarea.titulo]) {
      alert(`La tarea "${tarea.titulo}" ya está asignada a ${tareasAsignadas[tarea.titulo]}`);
      return;
    }

    setMisTareas([...misTareas, { ...tarea, prioridad: "Media" }]);
    setTareasAsignadas({ ...tareasAsignadas, [tarea.titulo]: user.nombre });
  };

  const quitarTarea = (index) => {
    const tareaQuitada = misTareas[index];
    const nuevasTareas = [...misTareas];
    nuevasTareas.splice(index, 1);
    setMisTareas(nuevasTareas);

    const nuevasAsignadas = { ...tareasAsignadas };
    if (tareasAsignadas[tareaQuitada.titulo] === user.nombre) {
      delete nuevasAsignadas[tareaQuitada.titulo];
      setTareasAsignadas(nuevasAsignadas);
    }
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
        <Route path="/crear-usuario" element={<CrearNuevoUsuario />} />

        <Route
          path="/"
          element={
            <RutaProtegida>
              <TareasGenerales
                tareas={tareasGenerales}
                misTareas={misTareas}
                tareasAsignadas={tareasAsignadas}
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

// Renderizar app completa
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
