import React from "react";
import '../estilos/estiloMisTareas.css';

const prioridades = ["Alta", "Media", "Baja"];

function MisTareas({ misTareas, quitarTarea, actualizarPrioridad }) {
  return (
    <section>
      <h2>Mis Tareas</h2>
      {misTareas.map((tarea, index) => (
        <div
          key={index}
          className="tarea"
          onDoubleClick={() => quitarTarea(index)}
        >
          <p>
            <strong>{tarea.titulo}</strong>: {tarea.descripcion}
          </p>
          <div className="prioridad">
            <p><strong>Prioridad:</strong></p>
            {prioridades.map((prioridad) => (
              <label key={prioridad}>
                {prioridad}
                <input
                  type="radio"
                  name={`prioridad-${index}`}
                  value={prioridad}
                  checked={tarea.prioridad === prioridad}
                  onChange={() => actualizarPrioridad(index, prioridad)}
                />
              </label>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default MisTareas;