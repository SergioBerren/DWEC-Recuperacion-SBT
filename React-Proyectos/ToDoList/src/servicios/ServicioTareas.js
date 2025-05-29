import http from "./http-axios.js"

class ServicioTareas {
    getAll(){
        return http.get("/tareas");
    }

    get(id){
        return http.get(`/tareas/${id}`);
    }

    create(data){
        return http.post("/tareas", data);
    }

    update(id, data){
        return http.put(`/tareas/${id}`, data);
    }

    delete(id){
        return http.delete(`/tareas/${id}`);
    }
}

export default new ServicioTareas();