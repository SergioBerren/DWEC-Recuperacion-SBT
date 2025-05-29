import { Link } from 'react-router-dom';
import '../estilos/estiloPoliticaDePrivacidad.css';

function PoliticaDePrivacidad() {
    return (
      <div className="politica-container">
        <h1>Política de Privacidad de TasksMaster</h1>
        <p className="fecha-actualizacion">Última actualización: {new Date().toLocaleDateString()}</p>
        
        <section className="seccion-politica">
          <h2>1. Información que Recopilamos</h2>
          <p>En TasksMaster, recopilamos la siguiente información cuando usas nuestra aplicación:</p>
          <ul>
            <li>Información de registro (nombre, email)</li>
            <li>Tareas y listas que creas</li>
            <li>Datos de uso (frecuencia de acceso, funcionalidades utilizadas)</li>
          </ul>
        </section>

        <section className="seccion-politica">
          <h2>2. Cómo Usamos Tu Información</h2>
          <p>Utilizamos tus datos para:</p>
          <ul>
            <li>Proveer y mejorar nuestro servicio</li>
            <li>Personalizar tu experiencia</li>
            <li>Comunicarnos contigo sobre actualizaciones</li>
          </ul>
        </section>

        <section className="seccion-politica">
          <h2>3. Protección de Datos</h2>
          <p>Implementamos medidas de seguridad como:</p>
          <ul>
            <li>Encriptación de datos sensibles</li>
            <li>Acceso restringido a tu información</li>
            <li>Revisiones periódicas de seguridad</li>
          </ul>
        </section>

        <section className="seccion-politica">
          <h2>4. Tus Derechos</h2>
          <p>Tienes derecho a:</p>
          <ul>
            <li>Acceder a tus datos personales</li>
            <li>Solicitar corrección o eliminación</li>
            <li>Oponerte al procesamiento de tus datos</li>
          </ul>
        </section>

        <section className="seccion-politica">
          <h2>5. Cookies y Tecnologías Similares</h2>
          <p>Usamos cookies para:</p>
          <ul>
            <li>Mantener tu sesión activa</li>
            <li>Recordar tus preferencias</li>
            <li>Analizar el uso de la aplicación</li>
          </ul>
        </section>

        <section className="seccion-politica">
          <h2>6. Contacto</h2>
          <p>Para preguntas sobre esta política:</p>
          <p>Email: <Link to="/contacto" className="link-contacto">privacidad@tasksmaster.com</Link></p>
        </section>

        <div className="volver-inicio">
          <Link to="/" className="boton-volver">Volver al Inicio</Link>
        </div>
      </div>
    );
}

export default PoliticaDePrivacidad;