import React from 'react';
import '../estilos/estiloSobreMi.css';
import fotoSergio from '../img/fotoSergio.jpeg';

function SobreMi() {
  return (
    <section className="sobre-mi">
      <h2>Sobre Mí</h2>
      <div className="contenido-sobre-mi">
        <img src={fotoSergio} alt="Foto de Sergio" className="foto-perfil" />

        <div className="descripcion">
          <p>¡Hola! Soy Sergio, tengo 21 años y soy un apasionado desarrollador en formación.</p>
          <p>
            Cuento con los títulos de Desarrollo de Aplicaciones Multiplataforma (DAM) y estoy acabando Desarrollo de Aplicaciones Web (DAW). Me encanta el mundo del desarrollo de software y busco siempre aprender nuevas tecnologías y mejorar mis habilidades.
          </p>
          <p>
            Disfruto trabajando en proyectos que combinan creatividad y lógica para ofrecer soluciones eficientes y atractivas.
          </p>
          <ul className="habilidades">
            <li>Programación en Java y JavaScript</li>
            <li>Desarrollo de aplicaciones móviles y web</li>
            <li>Bases de datos y sistemas</li>
            <li>Trabajo en equipo y gestión de proyectos</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default SobreMi;
