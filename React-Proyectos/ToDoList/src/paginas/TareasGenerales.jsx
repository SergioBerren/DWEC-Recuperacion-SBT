import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import '../estilos/estiloTareasGenerales.css';
import ServicioTareas from "../servicios/ServicioTareas";

function TareasGenerales({ misTareas, agregarTarea }) {
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  // Cargar tareas al montar el componente
  useEffect(() => {
    ServicioTareas.getAll()
      .then(response => {
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

    if (modoEdicion) {
      const tareaEditada = {
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
      };

      ServicioTareas.update(idEditar, tareaEditada)
        .then(() => {
          Swal.fire('Actualizada', 'La tarea fue modificada.', 'success');
          setTareas(prev =>
            prev.map(t =>
              t.id === idEditar ? { ...t, ...tareaEditada } : t
            )
          );
          resetFormulario();
        })
        .catch(error => {
          console.error("Error al modificar la tarea:", error);
          Swal.fire('Error', 'No se pudo modificar la tarea.', 'error');
        });
    } else {
      // Crear nueva tarea
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
          setTareas(prev => [...prev, response.data]);
          resetFormulario();
        })
        .catch(error => {
          console.error("Error al crear la tarea:", error);
          Swal.fire('Error', 'No se pudo crear la tarea.', 'error');
        });
    }
  }

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
            Swal.fire('Error', 'No se pudo eliminar la tarea.', 'error');
          });
      }
    });
  }

  function editarTarea(tarea) {
    setModoEdicion(true);
    setTitulo(tarea.titulo);
    setDescripcion(tarea.descripcion);
    setIdEditar(tarea.id);
  }

  function resetFormulario() {
    setTitulo("");
    setDescripcion("");
    setModoEdicion(false);
    setIdEditar(null);
  }

  return (
    <section>
      <h2>Tareas Generales</h2>

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
        <button type="submit">{modoEdicion ? "Modificar Tarea" : "Crear Tarea"}</button>
        {modoEdicion && <button type="button" onClick={resetFormulario}>Cancelar</button>}
      </form>

      {Array.isArray(tareas) && tareas.length > 0 ? (
        tareas.map((tarea) => {
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
                onClick={() => editarTarea(tarea)}
                className="btn-editar"
              >
                Modificar
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