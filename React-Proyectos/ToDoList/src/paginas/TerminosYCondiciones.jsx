import { Link } from 'react-router-dom';
import '../estilos/estiloTerminosYCondiciones.css';

function TerminosYCondiciones() {
    return (
      <div className="terminos-container">
        <h1>Términos y Condiciones de TasksMaster</h1>
        <p className="fecha-actualizacion">Última actualización: {new Date().toLocaleDateString()}</p>
        
        <section className="seccion-terminos">
          <h2>1. Aceptación de los Términos</h2>
          <p>Al utilizar TasksMaster, aceptas cumplir con estos términos y nuestra <Link to="/politicadeprivacidad" className="link-interno">Política de Privacidad</Link>.</p>
        </section>

        <section className="seccion-terminos">
          <h2>2. Uso del Servicio</h2>
          <p>TasksMaster te permite:</p>
          <ul>
            <li>Crear y gestionar listas de tareas</li>
            <li>Organizar tus actividades personales o profesionales</li>
            <li>Sincronizar tus datos entre dispositivos</li>
          </ul>
          <p>No puedes:</p>
          <ul>
            <li>Usar el servicio para actividades ilegales</li>
            <li>Intentar acceder a cuentas de otros usuarios</li>
            <li>Modificar, copiar o distribuir nuestro código</li>
          </ul>
        </section>

        <section className="seccion-terminos">
          <h2>3. Cuentas de Usuario</h2>
          <ul>
            <li>Eres responsable de mantener la confidencialidad de tu cuenta</li>
            <li>Debes proporcionar información precisa al registrarte</li>
            <li>Nos reservamos el derecho de suspender cuentas que violen estos términos</li>
          </ul>
        </section>

        <section className="seccion-terminos">
          <h2>4. Contenido del Usuario</h2>
          <p>Tú conservas los derechos sobre tus tareas y listas, pero nos otorgas una licencia para:</p>
          <ul>
            <li>Almacenar y procesar tus datos para proveer el servicio</li>
            <li>Realizar copias de seguridad</li>
            <li>Mejorar nuestros algoritmos de organización</li>
          </ul>
        </section>

        <section className="seccion-terminos">
          <h2>5. Limitación de Responsabilidad</h2>
          <p>TasksMaster no será responsable por:</p>
          <ul>
            <li>Pérdida de datos debido a fallos técnicos</li>
            <li>Daños indirectos o consecuenciales</li>
            <li>El contenido que los usuarios creen en la plataforma</li>
          </ul>
        </section>

        <section className="seccion-terminos">
          <h2>6. Modificaciones</h2>
          <p>Podemos actualizar estos términos ocasionalmente. Te notificaremos sobre cambios significativos.</p>
        </section>

        <section className="seccion-terminos">
          <h2>7. Ley Aplicable</h2>
          <p>Estos términos se rigen por las leyes de España. Cualquier disputa se resolverá en los tribunales de Madrid.</p>
        </section>

        <div className="volver-inicio">
          <Link to="/" className="boton-volver">Volver al Inicio</Link>
        </div>
      </div>
    );
}

export default TerminosYCondiciones;