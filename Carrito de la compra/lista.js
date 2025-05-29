let elementos = [];

function anadirElemento() {
    let input = document.getElementById("idArticulo");
    let nuevoElemento = input.value.trim();

    if (nuevoElemento === "") return;

    // Comprobamos si ya existe (sin distinguir mayúsculas/minúsculas ni tildes)
    let yaExiste = elementos.some(e => 
        e.localeCompare(nuevoElemento, 'es', { sensitivity: 'base' }) === 0
    );

    if (yaExiste) {
        alert("Ese artículo ya está en la lista.");
        return;
    }

    elementos.push(nuevoElemento);
    elementos.sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));

    input.value = "";

    borrarLista();
    dibujarLista();
}

function borrarLista() {
    let lista = document.getElementById("lista");
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
}

function dibujarLista() {
    let lista = document.getElementById("lista");

    elementos.forEach((texto, index) => {
        let li = document.createElement("li");
        li.textContent = texto;

        li.addEventListener("dblclick", function () {
            eliminarElemento(index);
        });

        lista.appendChild(li);
    });
}

function eliminarElemento(index) {
    elementos.splice(index, 1);
    borrarLista();
    dibujarLista();
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("idAnadir").addEventListener("click", anadirElemento);

    let lis = document.querySelectorAll("#lista li");
    lis.forEach(li => elementos.push(li.textContent));
    /* Esta línea fue buscada en Google lo que hace es ordenar alfabéticamente el array elementos pero de forma "inteligente"
    según el idioma español ('es') y de forma no sensible a mayúsculas/minúsculas ni acentos (por eso el sensitivity: 'base').*/
    elementos.sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));

    borrarLista();
    dibujarLista();
});
