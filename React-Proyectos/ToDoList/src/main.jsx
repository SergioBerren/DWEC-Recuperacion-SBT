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

function Main() {
  const [tareasGenerales, setTareasGenerales] = useState([]);
  const [misTareas, setMisTareas] = useState(() => {
    return JSON.parse(localStorage.getItem("misTareas")) || [];
  });
  const [seccion, setSeccion] = useState("tareasGenerales");

  useEffect(() => {
    fetch("/json/tareas.json")
      .then((res) => res.json())
      .then(setTareasGenerales)
      .catch((err) => console.error("Error al cargar tareas:", err));
  }, []);

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
    <main>
      <nav>
        <button onClick={() => setSeccion("tareasGenerales")}>Tareas Generales</button>
        <button onClick={() => setSeccion("misTareas")}>Mis Tareas</button>
      </nav>

      {seccion === "tareasGenerales" && (
        <TareasGenerales
          tareas={tareasGenerales}
          misTareas={misTareas}
          agregarTarea={agregarTarea}
        />
      )}

      {seccion === "misTareas" && (
        <MisTareas
          misTareas={misTareas}
          quitarTarea={quitarTarea}
          actualizarPrioridad={actualizarPrioridad}
        />
      )}
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Contacto" element={<Contacto />} />
        <Route path="/SobreMi" element={<SobreMi />} />
        <Route path="/politicadeprivacidad" element={<PoliticaDePrivacidad />} />
        <Route path="/terminos" element={<TerminosYCondiciones />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
