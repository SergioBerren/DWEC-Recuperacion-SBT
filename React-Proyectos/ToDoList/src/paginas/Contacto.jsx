import React, { useState } from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import "../estilos/estiloFormularioContacto.css";

function Contacto() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  const gestionarCambio = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validar = () => {
    const nuevosErrores = {};

    if (!form.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    } else if (form.nombre.length < 2 || form.nombre.length > 20) {
      nuevosErrores.nombre = "El nombre debe tener de 2 a 20 caracteres";
    } else if (/\d/.test(form.nombre)) {
      nuevosErrores.nombre = "El nombre no puede contener números";
    } else if (/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/.test(form.nombre)) {
      nuevosErrores.nombre = "El nombre no puede contener caracteres especiales";
    } else if (
      !/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/.test(
        form.nombre
      )
    ) {
      nuevosErrores.nombre =
        "El nombre siempre debe comenzar con mayúscula y seguir en minúsculas";
    }

    if (!form.email.trim()) {
      nuevosErrores.email = "El correo es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      nuevosErrores.email = "Correo electrónico no válido";
    } else if (/[A-Z]/.test(form.email)) {
      nuevosErrores.email = "El correo no debe de tener mayúsculas";
    }

    if (!form.mensaje.trim()) {
      nuevosErrores.mensaje = "El mensaje es obligatorio";
    } else if (form.mensaje.length < 1 || form.mensaje.length > 100) {
      nuevosErrores.mensaje = "El mensaje debe tener entre 1 y 100 caracteres";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const enviarFormulario = (e) => {
    e.preventDefault();

    if (validar()) {
      emailjs
        .send(
          "service_speca54",//"service_08tvr2b",    // Reemplaza por tu Service ID
          "template_xzause5",//"template_rtnekqs",   // Reemplaza por tu Template ID
          form,                 // Objeto con los datos del formulario
          "kabEovyNiPWn1qtIA"// "nds4VxoFnAXwExNDU"   // Reemplaza por tu Public Key
        )
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Formulario enviado",
            text: "¡Gracias por tu mensaje, te responderemos pronto!",
            confirmButtonText: "Cerrar",
          });

          setEnviado(true);
          setForm({ nombre: "", email: "", mensaje: "" });
          setErrores({});
        })
        .catch((error) => {
          console.error("Error al enviar:", error);

          Swal.fire({
            icon: "error",
            title: "Error al enviar",
            text: "Hubo un problema al enviar el formulario. Inténtalo más tarde.",
            confirmButtonText: "Cerrar",
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Ocurrió un error",
        text: "Por favor, revisa los campos del formulario.",
        confirmButtonText: "Cerrar",
      });

      setEnviado(false);
    }
  };

  return (
    <section className="contacto">
      <h2>Contáctame</h2>
      {enviado && <p className="enviado">¡Gracias por tu mensaje!</p>}

      <form onSubmit={enviarFormulario} noValidate>
        <label htmlFor="nombre">Nombre:</label>
        <input
          id="nombre"
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={gestionarCambio}
          placeholder="Escribe tu nombre"
        />
        {errores.nombre && <p className="error">{errores.nombre}</p>}

        <label htmlFor="email">Correo electrónico:</label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={gestionarCambio}
          placeholder="Escribe tu correo"
        />
        {errores.email && <p className="error">{errores.email}</p>}

        <label htmlFor="mensaje">Mensaje:</label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows="5"
          value={form.mensaje}
          onChange={gestionarCambio}
          placeholder="Escribe tu mensaje"
        />
        {errores.mensaje && <p className="error">{errores.mensaje}</p>}

        <button type="submit">Enviar</button>
      </form>
    </section>
  );
}

export default Contacto;