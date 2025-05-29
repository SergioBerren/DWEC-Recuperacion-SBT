import { useState } from "react";

function Motivacion({ nombre, edad }) {
  const [saludo, setSaludo] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [contador, setContador] = useState(0);
  const [mostrarInfo, setMostrarInfo] = useState(false);
  const [colorFondo, setColorFondo] = useState("white");
  const [loggedIn, setLoggedIn] = useState(false);
  const [fechaHora, setFechaHora] = useState(new Date().toLocaleString());

  const mostrarSaludo = () => {
    setSaludo("Hola desde React");
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

  const incrementar = () => setContador(contador + 1);
  const decrementar = () => setContador(contador - 1);
  const resetear = () => setContador(0);

  const cambiarInfo = () => {
    setMostrarInfo(!mostrarInfo);
  };

  let textoBotonInfo = "";
  if (mostrarInfo) {
    textoBotonInfo = "Ocultar info";
  } else {
    textoBotonInfo = "Mostrar info";
  }

  const cambiarColorFondo = () => {
    if (colorFondo === "white") {
      setColorFondo("blue");
    } else {
      setColorFondo("white");
    }
  };

  let mensajeLogin = "";
  if (loggedIn) {
    mensajeLogin = "Bienvenido";
  } else {
    mensajeLogin = "Por favor inicia sesión";
  }

  let textoBotonLogin = "";
  if (loggedIn) {
    textoBotonLogin = "Cerrar sesión";
  } else {
    textoBotonLogin = "Iniciar sesión";
  }

  const actualizarFechaHora = () => {
    setFechaHora(new Date().toLocaleString());
  };

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

        <button onClick={cambiarInfo}>{textoBotonInfo}</button>
        {mostrarInfo && <p>Información secreta...</p>}

        {tareas.map((data) => {
          return <div key={data.id}>Tarea: {data.tarea}</div>;
        })}

        <h2>Contador: {contador}</h2>
        <button onClick={incrementar}>+1</button>
        <button onClick={decrementar}>-1</button>
        <button onClick={resetear}>Reset</button>

        <div
          style={{
            backgroundColor: colorFondo,
            padding: "20px",
            marginTop: "20px",
            border: "1px solid #ccc",
          }}
        >
          <p>Este div cambia de color</p>
        </div>
        <button onClick={cambiarColorFondo}>Cambiar color de fondo</button>

        <h3>{mensajeLogin}</h3>
        <button onClick={() => setLoggedIn(!loggedIn)}>{textoBotonLogin}</button>

        <h3>Fecha y hora actual:</h3>
        <p>{fechaHora}</p>
        <button onClick={actualizarFechaHora}>Actualizar hora</button>
      </div>
    </>
  );
}

export default Motivacion;
