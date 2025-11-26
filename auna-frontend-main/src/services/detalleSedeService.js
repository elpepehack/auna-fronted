import axios from "axios";

const DETALLE_SEDE_BASE_REST_API_URL = "http://localhost:8080/api/v1/detalleSedes";

class DetalleSedeService {
    getAllDetalleSedes() {
        return axios.get(DETALLE_SEDE_BASE_REST_API_URL);
    }

    createDetalleSedes(detalleSede) {
        return axios.post(DETALLE_SEDE_BASE_REST_API_URL, detalleSede);
    }

    getDetalleSedeById(detalleSedeId) {
        return axios.get(DETALLE_SEDE_BASE_REST_API_URL + '/' + detalleSedeId);
    }

    updateDetalleSede(detalleSedeId, detalleSede) {
        return axios.put(DETALLE_SEDE_BASE_REST_API_URL + '/' + detalleSedeId, detalleSede)
    }

    deleteDetalleSede(detalleSedeId) {
        return axios.delete(DETALLE_SEDE_BASE_REST_API_URL + '/' + detalleSedeId)
    }
}

const detalleSedeService = new DetalleSedeService();
export default detalleSedeService;