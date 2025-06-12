import http from "./http-axios.js";

class ServicioTareas {
  getAll() {
    return http.get("/frutas");
  }

  get(id) {
    return http.get(`/frutas/${id}`);
  }

  create(data) {
    return http.post("/frutas", data);
  }

  update(id, data) {
    return http.put(`/frutas/${id}`, data);
  }

  delete(id) {
    return http.delete(`/frutas/${id}`);
  }
}

export default new ServicioTareas();