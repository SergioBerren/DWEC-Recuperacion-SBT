let recuperaIdContainer = document.querySelector(".container");
console.log(recuperaIdContainer);

tituloFormulario = document.createElement("h2");
tituloFormulario.textContent = "Formulario de Inicio de Sesión";

let formulario = document.createElement("form");
let etiquetaBr = document.createElement("br")

let etiquetaNombre = document.createElement("label");
etiquetaNombre.textContent = "Nombre de usuario:";
let inputNombre = document.createElement("input");
inputNombre.type = "text";
inputNombre.name = "username";

let etiquetaContrasena = document.createElement("label");
etiquetaContrasena.textContent = "Contraseña:";
let inputContrasena = document.createElement("input");
inputContrasena.type = "password";
inputContrasena.name = "password";

let botonEnviar = document.createElement("button");
botonEnviar.textContent = "Iniciar Sesión";
botonEnviar.type = "button";

formulario.appendChild(etiquetaNombre);
formulario.appendChild(inputNombre);
formulario.appendChild(etiquetaBr);
formulario.appendChild(etiquetaContrasena);
formulario.appendChild(inputContrasena);
formulario.appendChild(etiquetaBr);
formulario.appendChild(botonEnviar);

recuperaIdContainer.appendChild(tituloFormulario);
recuperaIdContainer.appendChild(formulario);

botonEnviar.addEventListener("click", function() {
    window.location.href = "general.html";
});
