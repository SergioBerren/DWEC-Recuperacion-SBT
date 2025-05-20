let documento = document.getElementsByClassName("container")
console.log(documento[0])

let datalist = document.createElement("datalist")
datalist.id = "libros"


fetch("libros.json")
    .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
       for (let libro of data) {
            let opcion = document.createElement("option")
            console.log(libro.titulo)
            opcion.innerHTML = libro.titulo
            console.log(opcion)
            datalist.appendChild(opcion)
            documento[0].appendChild(datalist)
        }
    })
      .catch(error => console.error(`Error al cargar los libros: ${error}`));