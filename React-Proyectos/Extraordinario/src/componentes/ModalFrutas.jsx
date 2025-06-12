import React from "react";
import '../estilos/estiloModalTareas.css';

function ModalFrutas({
  isOpen,
  onClose,
  onSubmit,
  titulo,
  descripcion,
  setTitulo,
  setDescripcion,
  modoEdicion
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <h3>{modoEdicion ? "Modificar Tarea" : "Crear Tarea"}</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setNombre(e.target.value)}
          />
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <div className="modal-botones">
            <button type="submit" className="btnCrearModificarTarea">
              {modoEdicion ? "Modificar" : "Crear"}
            </button>
            <button type="button" onClick={onClose} className="btnCancelarTarea">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalTarea;
