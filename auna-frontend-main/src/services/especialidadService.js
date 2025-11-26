import axios from "axios";

const ESPECIALIDAD_BASE_REST_API_URL = "http://localhost:8080/api/v1/especialidades";

class EspecialidadService {
    getAllEspecialidades() {
        return axios.get(ESPECIALIDAD_BASE_REST_API_URL);
    }

    createEspecialidades(especialidad) {
        return axios.post(ESPECIALIDAD_BASE_REST_API_URL, especialidad);
    }

    getEspecialidadById(especialidadId) {
        return axios.get(ESPECIALIDAD_BASE_REST_API_URL + '/' + especialidadId);
    }

    updateEspecialidad(especialidadId, especialidad) {
        return axios.put(ESPECIALIDAD_BASE_REST_API_URL + '/' + especialidadId, especialidad)
    }

    deleteEspecialidad(especialidadId) {
        return axios.delete(ESPECIALIDAD_BASE_REST_API_URL + '/' + especialidadId)
    }
}

const especialidadService = new EspecialidadService();
export default especialidadService;