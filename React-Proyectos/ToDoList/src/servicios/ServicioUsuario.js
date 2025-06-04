import http from "./http-axios.js";

class ServicioUsuario {
   getAll() {
     return http.get("/tareas");
   }

  login(usuario,pass) {
      return http.get(`/usuarios?nombre=${usuario}&pass=${pass}`);
      //http://localhost:3000/usuarios?nombre=agustin&pass=123
   }

  verificarExistenciaUsuario(nombre) {
    return http.get(`/usuarios?nombre=${nombre}`);
  }

  crearUsuario(nuevoUsuario) {
    return http.post("/usuarios", nuevoUsuario);
  }
}

export default new ServicioUsuario();
