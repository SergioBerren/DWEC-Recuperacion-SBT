import React from "react";
import '../estilos/estiloTareasGenerales.css';

function TareasGenerales({ tareas, misTareas, agregarTarea }) {
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

export default TareasGenerales