import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import '../estilos/estiloTareasGenerales.css';
import ServicioTareas from "../servicios/ServicioTareas";

function TareasGenerales({ misTareas, agregarTarea }) {
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // Cargar tareas al montar el componente
  useEffect(() => {
    ServicioTareas.getAll()
  .then(response => {
    console.log("Respuesta del backend:", response.data);
    const data = response.data;
    if (Array.isArray(data)) {
      setTareas(data);
    } else {
      throw new Error("Estructura de datos inválida");
    }
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

  // Crear nueva tarea
  function crearTareas(e) {
    e.preventDefault();

    if (!titulo.trim() || !descripcion.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor ingresa título y descripción válidos.',
      });
      return;
    }

    const nuevaTarea = {
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
    };

    ServicioTareas.create(nuevaTarea)
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Tarea creada',
          text: 'La tarea fue agregada correctamente.',
        });

        // Asumimos que la respuesta incluye la tarea creada con su ID
        setTareas(prev => [...prev, response.data]);
        setTitulo("");
        setDescripcion("");
      })
      .catch(error => {
        console.error("Error al crear la tarea:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo crear la tarea.',
        });
      });
  }

  // Eliminar tarea por ID
  function eliminarTarea(idEliminar, tituloEliminar) {
    Swal.fire({
      title: `¿Eliminar tarea "${tituloEliminar}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        ServicioTareas.delete(idEliminar)
          .then(() => {
            Swal.fire('Eliminada', 'La tarea fue eliminada.', 'success');
            setTareas(prev => prev.filter(t => t.id !== idEliminar));
          })
          .catch(error => {
            console.error("Error al eliminar la tarea:", error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar la tarea.',
            });
          });
      }
    });
  }

  return (
    <section>
      <h2>Tareas Generales</h2>

      {/* FORMULARIO PARA CREAR NUEVA TAREA */}
      <form onSubmit={crearTareas} className="formulario-tarea">
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <button type="submit">Crear Tarea</button>
      </form>

      {/* LISTA DE TAREAS */}
      {Array.isArray(tareas) && tareas.length > 0 ? (
        tareas.map((tarea) => {
          console.log(`${tareas}`)
          const yaAsignada = misTareas.some((t) => t.titulo === tarea.titulo);
          return (
            <div key={tarea.id} className="tarea">
              <p>
                <strong>{tarea.titulo}</strong>: {tarea.descripcion}
              </p>
              <button
                onClick={() => agregarTarea(tarea)}
                disabled={yaAsignada}
              >
                Agregar tarea
              </button>
              <button
                onClick={() => eliminarTarea(tarea.id, tarea.titulo)}
                className="btn-eliminar"
              >
                Eliminar
              </button>
              {yaAsignada && <span className="asignada">Asignada</span>}
            </div>
          );
        })
      ) : (
        <p>No hay tareas disponibles.</p>
      )}
    </section>
  );
}

export default TareasGenerales;
