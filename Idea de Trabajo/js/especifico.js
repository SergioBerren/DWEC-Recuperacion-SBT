let tareasGenerales = [];
let misTareas = JSON.parse(localStorage.getItem("misTareas")) || [];
let prioridadArray = ["Alta", "Media", "Baja"]

function mostrarTareas() {
  let tareasGeneralesSection = document.getElementById("tareasGenerales");
  tareasGeneralesSection.innerHTML = "";

  tareasGenerales.forEach((tarea) => {
    let tareaElement = document.createElement("div");
    tareaElement.classList.add("tarea");

    let tareaTexto = document.createElement("p");
    tareaTexto.innerHTML = `<strong>${tarea.titulo}</strong>: ${tarea.descripcion}`;

    let botonAgregar = document.createElement("button");
    botonAgregar.innerHTML = "Agregar tarea";

    // Mensaje de asignada
    let mensajeAsignada = document.createElement("span");
    mensajeAsignada.classList.add("asignada");

    const yaAsignada = misTareas.some(t => t.titulo === tarea.titulo);
    if (yaAsignada) {
      mensajeAsignada.textContent = "Asignada";
      botonAgregar.disabled = true;
    }

    botonAgregar.addEventListener("click", () => {
      agregarTarea(tarea);
      mensajeAsignada.textContent = "Asignada";
      botonAgregar.disabled = true;
    });

    tareaElement.appendChild(tareaTexto);
    tareaElement.appendChild(botonAgregar);
    tareaElement.appendChild(mensajeAsignada);
    tareasGeneralesSection.appendChild(tareaElement);
  });

  let misTareasSection = document.getElementById("misTareas");
  misTareasSection.innerHTML = "";

  misTareas.forEach((tarea, index) => {
    let tareaElement = document.createElement("div");
    tareaElement.classList.add("tarea");

    let tareaTexto = document.createElement("p");
    tareaTexto.innerHTML = `<strong>${tarea.titulo}</strong>: ${tarea.descripcion}`;

    // Crear los radiobuttons de prioridad
    let prioridadDiv = document.createElement("div");
    prioridadDiv.classList.add("prioridad");
    let prioridadTexto = document.createElement("p");
    prioridadTexto.innerHTML = "<strong>Prioridad:</strong>";
    prioridadDiv.appendChild(prioridadTexto);

      prioridadArray.forEach((prioridad) => {
      let label = document.createElement("label");
      label.textContent = prioridad;

      let radioButton = document.createElement("input");
      radioButton.type = "radio";
      radioButton.name = `prioridad-${tarea.titulo}`;
      radioButton.value = prioridad;

      if (tarea.prioridad && tarea.prioridad === prioridad) {
        radioButton.checked = true;
      }

      // Agregar el radiobutton al label
      label.appendChild(radioButton);
      prioridadDiv.appendChild(label);

      radioButton.addEventListener("change", () => {
        tarea.prioridad = prioridad;
        guardarMisTareas();
      });
    });

    tareaElement.appendChild(tareaTexto);
    tareaElement.appendChild(prioridadDiv);

    tareaElement.addEventListener("dblclick", () => {
      misTareas.splice(index, 1);
      guardarMisTareas();
      mostrarTareas();
    });

    misTareasSection.appendChild(tareaElement);
  });
}

function agregarTarea(tarea) {
  if (misTareas.some(t => t.titulo === tarea.titulo)) {
    alert("Esta tarea ya fue agregada.");
    return;
  }

  // Asignar prioridad por defecto (si no se ha seleccionado una)
  tarea.prioridad = "Media";

  misTareas.push(tarea);
  guardarMisTareas();
  mostrarTareas();
}

function guardarMisTareas() {
  localStorage.setItem("misTareas", JSON.stringify(misTareas));
}

function mostrarSeccion(seccion) {
  document.querySelectorAll("main section").forEach((sec) => {
    sec.style.display = "none";
  });
  let sectionActual = document.getElementById(seccion);
  sectionActual.style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("json/tareas.json")
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error al cargar tareas: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      tareasGenerales = data;
      mostrarTareas();
      mostrarSeccion("tareasGenerales");
    })
    .catch(error => {
      console.error("Error al cargar el archivo JSON:", error);
    });

  document.getElementById("linkTareasGenerales").addEventListener("click", () => mostrarSeccion("tareasGenerales"));
  document.getElementById("linkMisTareas").addEventListener("click", () => mostrarSeccion("misTareas"));
});
