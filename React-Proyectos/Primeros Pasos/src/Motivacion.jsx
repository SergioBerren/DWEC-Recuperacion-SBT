import { useState } from "react";

function Motivacion({ nombre, edad }) {
  const [pintado, setPintado] = useState(false);
  const [inicia, setInicia] = useState(false);
  const [saludo, setSaludo] = useState("");
  const [info, setInfo] = useState("");
  const [inputValue, setInputValue] = useState("");

  const cambiarDecolor = () => {
    if (pintado === true) {
      setPintado(false);
    } else {
      setPintado(true);
    }
  };

  const iniciaSesion = () => {
    if(inicia === true){
      setInicia(false)
    } else {
      setInicia(true)
    }
  }

  const mostrarSaludo = () => {
    setSaludo("Hola desde React");
  };

  const mostrarInfo = () => {
    setInfo("El que ha programado esto te dice que eres un crack");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const tareas = [
    { tarea: "Hacer ejercicio", id: "0" },
    { tarea: "Programar", id: "1" },
    { tarea: "Estudiar React", id: "2" },
    { tarea: "Ver una película", id: "3" },
  ];

  // Determinar el color de fondo usando if...else clásico
  let colorFondo;
  if (pintado === true) {
    colorFondo = "blue";
  } else {
    colorFondo = "white";
  }

  let iniciado;

  if(inicia === true){
    iniciado = "Has iniciado sesión";
  } else {
    iniciado = "Tienes que iniciar sesión";
  }

  return (
    <>
      <div className="Motivacion">
        <p>Sigue practicando y serás un crack en React!</p>
        <p>Nombre: {nombre}</p>
        <p>Edad: {edad}</p>

        <button onClick={mostrarSaludo}>Mostrar saludo</button>
        <p>{saludo}</p>

        <label htmlFor="miInput">Ingresa texto:</label>
        <input
          type="text"
          id="miInput"
          value={inputValue}
          onChange={handleInputChange}
        />
        <p>Texto ingresado: {inputValue}</p>

        <button onClick={mostrarInfo}>Mostrar información</button>
        <p>{info}</p>

        <div
          style={{
            backgroundColor: colorFondo,
            padding: "10px"
          }}
        >
          Este div cambia de color al hacer clic en el botón.
        </div>
        <button onClick={cambiarDecolor}>Cambiar color del div</button>


        <div>
          {iniciado}
        </div>
        <button onClick={iniciaSesion}>Iniciar sesión</button>

        {tareas.map((data) => (
          <div key={data.id}>Tarea: {data.tarea}</div>
        ))}
      </div>
    </>
  );
}

export default Motivacion;