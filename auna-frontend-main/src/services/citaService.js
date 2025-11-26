import axios from "axios";

const CITA_BASE_REST_API_URL = "http://localhost:8080/api/v1/citas";

class CitaService {
    getAllCitas() {
        return axios.get(CITA_BASE_REST_API_URL);
    }

    getCitasPorIDPaciente(idPaciente) {
        return axios.get(CITA_BASE_REST_API_URL + "/paciente/" + idPaciente);
    }

    createCitas(cita) {
        return axios.post(CITA_BASE_REST_API_URL, cita);
    }

    getCitaById(citaId) {
        return axios.get(CITA_BASE_REST_API_URL + '/' + citaId);
    }

    updateCita(citaId, cita) {
        return axios.put(CITA_BASE_REST_API_URL + '/' + citaId, cita)
    }

    deleteCita(citaId) {
        return axios.delete(CITA_BASE_REST_API_URL + '/' + citaId)
    }
}

const citaService = new CitaService();
export default citaService;