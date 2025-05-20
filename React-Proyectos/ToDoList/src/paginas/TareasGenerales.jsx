import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import '../estilos/estiloTareasGenerales.css';

function TareasGenerales({ misTareas, agregarTarea }) {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    axios.get('/json/tareas.json')
      .then(response => {
        setTareas(response.data);
      })
      .catch(error => {
        console.error("Error al cargar las tareas:", error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudieron cargar las tareas. Intenta más tarde.',
        });
      });
  }, []);

  return (
    <section>
      <h2>Tareas Generales</h2>
      {tareas.map((tarea, index) => {
        const yaAsignada = misTareas.some((t) => t.titulo === tarea.titulo);
        return (
          <div key={index} className="tarea">
            <p>
              <strong>{tarea.titulo}</strong>: {tarea.descripcion}
            </p>
            <button
              onClick={() => agregarTarea(tarea)}
              disabled={yaAsignada}
            >
              Agregar tarea
            </button>
            {yaAsignada && <span className="asignada">Asignada</span>}
          </div>
        );
      })}
    </section>
  );
}

export default TareasGenerales;
