let contenedor = document.getElementById('formResultados');
let mensajeError = document.getElementById('errorMensaje');

let btnIntercambiar = document.getElementById('swapButton');
let inputOrigen = document.getElementById('origen');
let inputDestino = document.getElementById('destino');
let soloIda = document.getElementById('soloIda');
let inputFechaIda = document.getElementById('fechaIda');
let inputFechaVuelta = document.getElementById('fechaVuelta');
let btnEnviar = document.getElementById('btnBuscar');

let resOrigen = document.getElementById('resOrigen');
let resDestino = document.getElementById('resDestino');
let resFechaIda = document.getElementById('resFechaIda');
let resFechaVuelta = document.getElementById('resFechaVuelta');
let resSoloIda = document.getElementById('resSoloIda');

let hoy = new Date();
let anio = hoy.getFullYear();
let mes = String(hoy.getMonth() + 1).padStart(2, '0');
let dia = String(hoy.getDate()).padStart(2, '0');
let fechaHoy = `${anio}-${mes}-${dia}`;

inputFechaIda.setAttribute("min", fechaHoy);

inputFechaIda.addEventListener("change", () => {
    let fechaIdaValue = new Date(inputFechaIda.value);
    inputFechaVuelta.setAttribute("min", fechaIdaValue.toISOString().split("T")[0]);
});

btnIntercambiar.addEventListener("click", function () {
    let variableIntermedia = inputDestino.value;
    inputDestino.value = inputOrigen.value;
    inputOrigen.value = variableIntermedia;
});

soloIda.addEventListener("click", function () {
    if (soloIda.checked === true) {
        inputFechaVuelta.setAttribute("disabled", true);
        inputFechaVuelta.value = "";
    } else {
        inputFechaVuelta.removeAttribute("disabled");
    }
});

btnEnviar.addEventListener("click", function (e) {
    e.preventDefault();
    if (validarFormulario()) {
        pintarTodo();
    }
});

function mostrarError(mensaje) {
    mensajeError.innerHTML = mensaje;
    mensajeError.classList.remove("hidden");
}

function ocultarError() {
    mensajeError.innerHTML = "";
    mensajeError.classList.add("hidden");
}

function validarFormulario() {
    let origen = inputOrigen.value.trim();
    let destino = inputDestino.value.trim();
    let fechaIda = inputFechaIda.value.trim();
    let fechaVuelta = inputFechaVuelta.value.trim();

    if (origen === "" || destino === "") {
        mostrarError("Por favor, complete origen y destino");
        return false;
    }

    if (!fechaIda) {
        mostrarError("Por favor, seleccione una fecha de ida");
        return false;
    }

    if (!soloIda.checked && (!fechaVuelta || new Date(fechaIda) > new Date(fechaVuelta))) {
        mostrarError("La fecha de vuelta no puede ser anterior a la de ida o estar vacía");
        return false;
    }

    ocultarError();
    return true;
}

function pintarTodo() {
    resOrigen.innerHTML = inputOrigen.value || "—";
    resDestino.innerHTML = inputDestino.value || "—";
    resFechaIda.innerHTML = inputFechaIda.value || "—";

    if (soloIda.checked) {
        resSoloIda.innerHTML = "Sí";
        resFechaVuelta.innerHTML = "Es solo de ida";
    } else {
        resSoloIda.innerHTML = "No";
        resFechaVuelta.innerHTML = inputFechaVuelta.value || "—";
    }

    document.querySelectorAll('.extra-info').forEach(el => el.remove());

    // Asiento aleatorio
    let asientoDiv = document.createElement('div');
    asientoDiv.className = 'extra-info';
    let asientoLabel = document.createElement('strong');
    asientoLabel.textContent = 'Asiento: ';
    let asientoValor = document.createTextNode(Math.floor(Math.random() * 59) + 1);
    asientoDiv.appendChild(asientoLabel);
    asientoDiv.appendChild(asientoValor);
    contenedor.appendChild(asientoDiv);

    // Hora aleatoria
    let horaDiv = document.createElement('div');
    horaDiv.className = 'extra-info';
    let horaLabel = document.createElement('strong');
    horaLabel.textContent = 'Hora salida: ';
    let horas = Math.floor(Math.random() * 24);
    let minutos = Math.floor(Math.random() * 60);
    let horaFormateada = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
    let horaValor = document.createTextNode(horaFormateada);
    horaDiv.appendChild(horaLabel);
    horaDiv.appendChild(horaValor);
    contenedor.appendChild(horaDiv);
}