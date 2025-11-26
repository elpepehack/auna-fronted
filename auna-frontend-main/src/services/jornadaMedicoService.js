import axios from "axios";

const JORNADA_MEDICO_BASE_REST_API_URL = "http://localhost:8080/api/v1/jornadaMedicos";

class JornadaMedicoService {
    getAllJornadaMedicos() {
        return axios.get(JORNADA_MEDICO_BASE_REST_API_URL);
    }

    createJornadaMedicos(jornadaMedico) {
        return axios.post(JORNADA_MEDICO_BASE_REST_API_URL, jornadaMedico);
    }

    getJornadaMedicoById(jornadaMedicoId) {
        return axios.get(JORNADA_MEDICO_BASE_REST_API_URL + '/' + jornadaMedicoId);
    }

    updateJornadaMedico(jornadaMedicoId, jornadaMedico) {
        return axios.put(JORNADA_MEDICO_BASE_REST_API_URL + '/' + jornadaMedicoId, jornadaMedico)
    }

    deleteJornadaMedico(jornadaMedicoId) {
        return axios.delete(JORNADA_MEDICO_BASE_REST_API_URL + '/' + jornadaMedicoId)
    }
}

const jornadaMedicoService = new JornadaMedicoService();
export default jornadaMedicoService;