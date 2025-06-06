import http from "./http-axios.js";

class ServicioUsuario {
  getAll() {
    return http.get("/tareas");
  }

  // Nuevo método: login sin pasar contraseña en la URL
  getUsuarioPorNombre(nombre) {
    return http.get(`/usuarios?nombre=${nombre}`);
  }

  verificarExistenciaUsuario(nombre) {
    return http.get(`/usuarios?nombre=${nombre}`);
  }

  crearUsuario(nuevoUsuario) {
    return http.post("/usuarios", nuevoUsuario);
  }
}

export default new ServicioUsuario();
