/*
Este JSX está para hacer pruebas de estilo, es identico a TareasGenerales,
solo cambia la estructura del HTML y no se está utilizando en ningún momento,
es simplemente para pruebas.
*/

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import '../estilos/estiloTareasGenerales2.css';
import ServicioTareas from "../servicios/ServicioTareas.js";
import ModalTarea from "./ModalTareas.jsx";
import { useAuth } from '../login/AuthProvider.jsx';

import { FilePlus, PlusCircle, Edit2, Trash2 } from 'lucide-react';

function TareasGenerales({ misTareas, agregarTarea }) {
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  const { user } = useAuth();

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
          cerrarModal();
        })
        .catch(error => {
          console.error("Error al modificar la tarea:", error);
          Swal.fire('Error', 'No se pudo modificar la tarea.', 'error');
        });
    } else {
      const nuevaTarea = {
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
      };

      ServicioTareas.create(nuevaTarea)
        .then(response => {
          Swal.fire('Creada', 'La tarea fue agregada correctamente.', 'success');
          setTareas(prev => [...prev, response.data]);
          cerrarModal();
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
    setModalAbierto(true);
  }

  function abrirModalParaCrear() {
    resetFormulario();
    setModalAbierto(true);
  }

  function cerrarModal() {
    resetFormulario();
    setModalAbierto(false);
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

      {user?.administrador === 1 && (  // {user && user.administrador === 1 && ()}
        <button className="btnAbrirModal" onClick={abrirModalParaCrear}>
          <PlusCircle size={20} className="iconoNuevaTarea" />
          Nueva Tarea
        </button>
      )}

      <ModalTarea
        isOpen={modalAbierto}
        onClose={cerrarModal}
        onSubmit={crearTareas}
        titulo={titulo}
        descripcion={descripcion}
        setTitulo={setTitulo}
        setDescripcion={setDescripcion}
        modoEdicion={modoEdicion}
      />

      {Array.isArray(tareas) && tareas.length > 0 ? (
        tareas.map((tarea) => {
          const yaAsignada = misTareas.some((t) => t.titulo === tarea.titulo);
          return (
            <div key={tarea.id} className="tarea">
              <div className="contenido-tarea">
                <p className="texto-tarea">
                  <strong>{tarea.titulo}</strong>: {tarea.descripcion}
                </p>

                <div className="acciones-tarea">
                  <button onClick={() => agregarTarea(tarea)} disabled={yaAsignada}>
                    <FilePlus size={18} className="iconoAgregarTarea" />
                    Agregar tarea
                  </button>

                  {user?.administrador === 1 && (
                    <>
                      <button onClick={() => editarTarea(tarea)} className="btn-editar">
                        <Edit2 size={18} className="iconoEditar" />
                        Modificar
                      </button>
                      <button onClick={() => eliminarTarea(tarea.id, tarea.titulo)} className="btn-eliminar">
                        <Trash2 size={18} className="iconoBasura" />
                        Eliminar
                      </button>
                    </>
                  )}

                  {yaAsignada && <span className="asignada">Asignada</span>}
                </div>
              </div>
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
