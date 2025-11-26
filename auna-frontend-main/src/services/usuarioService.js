import axios from "axios";

const USUARIO_BASE_REST_API_URL = "http://localhost:8080/api/v1/usuarios";

class UsuarioService {
    getAllUsuarios() {
        return axios.get(USUARIO_BASE_REST_API_URL);
    }

    createUsuarios(usuario) {
        return axios.post(USUARIO_BASE_REST_API_URL, usuario);
    }

    getUsuarioById(usuarioId) {
        return axios.get(USUARIO_BASE_REST_API_URL + '/' + usuarioId);
    }

    updateUsuario(usuarioId, usuario) {
        return axios.put(USUARIO_BASE_REST_API_URL + '/' + usuarioId, usuario)
    }

    deleteUsuario(usuarioId) {
        return axios.delete(USUARIO_BASE_REST_API_URL + '/' + usuarioId)
    }
}

const usuarioService = new UsuarioService();
export default usuarioService;