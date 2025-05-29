<<<<<<< HEAD
let librosDisponibles = [];
let librosSeleccionados = [];

document.addEventListener("DOMContentLoaded", () => {
    let container = document.querySelector(".container");

    let datalist = document.createElement("datalist");
    datalist.id = "libros";
    container.appendChild(datalist);

    fetch("libros.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error, status = ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            librosDisponibles = data;

            data.forEach(libro => {
                let opcion = document.createElement("option");
                opcion.value = libro.titulo;
                datalist.appendChild(opcion);
            });
        })
        .catch(error => console.error("Error al cargar los libros:", error));

    let inputLibro = document.getElementById("libroInput");
    let mensajeError = document.createElement("p");

    mensajeError.id = "mensajeError";
    mensajeError.classList.add("error");
    container.appendChild(mensajeError);

    let listaLibros = document.createElement("ul");
    listaLibros.id = "libroList";
    container.appendChild(listaLibros);

    inputLibro.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            agregarLibro();
        }
    });

    function agregarLibro() {
        let titulo = inputLibro.value.trim();
        mensajeError.innerHTML = "";

        if (!titulo) {
            mensajeError.innerHTML = "Por favor, escribe un título.";
            return;
        }

        let libroEncontrado = librosDisponibles.find(libro => libro.titulo.toLowerCase() === titulo.toLowerCase());

        if (!libroEncontrado) {
            mensajeError.innerHTML = "Libro no encontrado.";
            return;
        }

        if (librosSeleccionados.some(libro => libro.titulo === libroEncontrado.titulo)) {
            mensajeError.innerHTML = "Este libro ya está en la lista.";
            return;
        }

        librosSeleccionados.push(libroEncontrado);
        actualizarLista(librosSeleccionados.length - 1, true);
        inputLibro.value = "";
    }

    function actualizarLista(indiceUltimoLibro, completo) {
        listaLibros.innerHTML = "";

        librosSeleccionados.forEach((libro, index) => {
            let li = document.createElement("li");
            li.innerHTML = `${libro.titulo} - ${libro.precio.toFixed(2)} €`;

            li.addEventListener("dblclick", () => {
                librosSeleccionados.splice(index, 1);
                actualizarLista(indiceUltimoLibro, false);
            });

            if (index === indiceUltimoLibro && completo === true) {
                li.classList.add("rojo");
            }/* else {
                li.classList.remove("rojo");
            }*/

            listaLibros.appendChild(li);
        });

        actualizarResumen();
    }

    function actualizarResumen() {
        let totalLibros = document.getElementById("idElementos");
        let importeTotal = document.getElementById("idImporte");

        totalLibros.innerHTML = librosSeleccionados.length;
        let total = librosSeleccionados.reduce((sum, libro) => sum + libro.precio, 0);
        importeTotal.innerHTML = total.toFixed(2);
    }
});
=======
let librosDisponibles = [];
let librosSeleccionados = [];

document.addEventListener("DOMContentLoaded", () => {
    let container = document.querySelector(".container");

    let datalist = document.createElement("datalist");
    datalist.id = "libros";
    container.appendChild(datalist);

    fetch("libros.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error, status = ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            librosDisponibles = data;

            data.forEach(libro => {
                let opcion = document.createElement("option");
                opcion.value = libro.titulo;
                datalist.appendChild(opcion);
            });
        })
        .catch(error => console.error("Error al cargar los libros:", error));

    let inputLibro = document.getElementById("libroInput");
    let mensajeError = document.createElement("p");

    mensajeError.id = "mensajeError";
    mensajeError.classList.add("error");
    container.appendChild(mensajeError);

    let listaLibros = document.createElement("ul");
    listaLibros.id = "libroList";
    container.appendChild(listaLibros);

    inputLibro.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            agregarLibro();
        }
    });

    function agregarLibro() {
        let titulo = inputLibro.value.trim();
        mensajeError.innerHTML = "";

        if (!titulo) {
            mensajeError.innerHTML = "Por favor, escribe un título.";
            return;
        }

        let libroEncontrado = librosDisponibles.find(libro => libro.titulo.toLowerCase() === titulo.toLowerCase());

        if (!libroEncontrado) {
            mensajeError.innerHTML = "Libro no encontrado.";
            return;
        }

        if (librosSeleccionados.some(libro => libro.titulo === libroEncontrado.titulo)) {
            mensajeError.innerHTML = "Este libro ya está en la lista.";
            return;
        }

        librosSeleccionados.push(libroEncontrado);
        actualizarLista(librosSeleccionados.length - 1, true);
        inputLibro.value = "";
    }

    function actualizarLista(indiceUltimoLibro, completo) {
        listaLibros.innerHTML = "";

        librosSeleccionados.forEach((libro, index) => {
            let li = document.createElement("li");
            li.innerHTML = `${libro.titulo} - ${libro.precio.toFixed(2)} €`;

            li.addEventListener("dblclick", () => {
                librosSeleccionados.splice(index, 1);
                actualizarLista(indiceUltimoLibro, false);
            });

            if (index === indiceUltimoLibro && completo === true) {
                li.classList.add("rojo");
            }/* else {
                li.classList.remove("rojo");
            }*/

            listaLibros.appendChild(li);
        });

        actualizarResumen();
    }

    function actualizarResumen() {
        let totalLibros = document.getElementById("idElementos");
        let importeTotal = document.getElementById("idImporte");

        totalLibros.innerHTML = librosSeleccionados.length;
        let total = librosSeleccionados.reduce((sum, libro) => sum + libro.precio, 0);
        importeTotal.innerHTML = total.toFixed(2);
    }
});
>>>>>>> main
