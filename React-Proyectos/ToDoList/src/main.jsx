import React, { useState, useEffect, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contacto from './paginas/Contacto.jsx';
import SobreMi from './paginas/SobreMi.jsx';
import Header from './componentes/Header.jsx';
import Footer from './componentes/Footer.jsx';
import PoliticaDePrivacidad from './paginas/PoliticaDePrivacidad.jsx';
import TerminosYCondiciones from './paginas/TerminosYCondiciones.jsx';
import TareasGenerales from "./paginas/TareasGenerales";
import MisTareas from "./paginas/MisTareas";

function App() {
  const [misTareas, setMisTareas] = useState(() => {
    return JSON.parse(localStorage.getItem("misTareas")) || [];
  });

  useEffect(() => {
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
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={
          <TareasGenerales
            misTareas={misTareas}
            agregarTarea={agregarTarea}
          />
        } />
        <Route path="/mistareas" element={
          <MisTareas
            misTareas={misTareas}
            quitarTarea={quitarTarea}
            actualizarPrioridad={actualizarPrioridad}
          />
        } />
        <Route path="/sobreMi" element={<SobreMi />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/politicadeprivacidad" element={<PoliticaDePrivacidad />} />
        <Route path="/terminos" element={<TerminosYCondiciones />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);