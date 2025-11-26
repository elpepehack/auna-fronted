import axios from "axios";

const SEDE_BASE_REST_API_URL = "http://localhost:8080/api/v1/sedes";

class SedeService {
    getAllSedes() {
        return axios.get(SEDE_BASE_REST_API_URL);
    }

    createSedes(sede) {
        return axios.post(SEDE_BASE_REST_API_URL, sede);
    }

    getSedeById(sedeId) {
        return axios.get(SEDE_BASE_REST_API_URL + '/' + sedeId);
    }

    updateSede(sedeId, sede) {
        return axios.put(SEDE_BASE_REST_API_URL + '/' + sedeId, sede)
    }

    deleteSede(sedeId) {
        return axios.delete(SEDE_BASE_REST_API_URL + '/' + sedeId)
    }
}

const sedeService = new SedeService();
export default sedeService;