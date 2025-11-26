import axios from "axios";

const TURNO_ATENCION_CITA_BASE_REST_API_URL = "http://localhost:8080/api/v1/turnosAtencionCitas";

class TurnoAtencionCitaService {
    getAllTurnosAtencionCitas() {
        return axios.get(TURNO_ATENCION_CITA_BASE_REST_API_URL);
    }

    createTurnosAtencionCitas(turnoAtencionCita) {
        return axios.post(TURNO_ATENCION_CITA_BASE_REST_API_URL, turnoAtencionCita);
    }

    getTurnoAtencionCitaById(turnoAtencionCitaId) {
        return axios.get(TURNO_ATENCION_CITA_BASE_REST_API_URL + '/' + turnoAtencionCitaId);
    }

    updateTurnoAtencionCita(turnoAtencionCitaId, turnoAtencionCita) {
        return axios.put(TURNO_ATENCION_CITA_BASE_REST_API_URL + '/' + turnoAtencionCitaId, turnoAtencionCita)
    }

    deleteTurnoAtencionCita(turnoAtencionCitaId) {
        return axios.delete(TURNO_ATENCION_CITA_BASE_REST_API_URL + '/' + turnoAtencionCitaId)
    }
}

const turnoAtencionCitaService = new TurnoAtencionCitaService();
export default turnoAtencionCitaService;