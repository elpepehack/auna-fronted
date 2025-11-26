import React from 'react';
import { useNavigate } from 'react-router-dom';

export const PaginaNoAutorizado = () => {
    const navigate = useNavigate();

    const handleVolver = () => {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        if (!usuario) {
            navigate("/ingresar");
        } else if (usuario.tipoUsuario === "PACIENTE") {
            navigate("/");
        } else if (usuario.tipoUsuario === "ADMINISTRADOR") {
            navigate("/dashboard");
        } else {
            navigate("/ingresar");
        }
    };

    return (
        <div className="text-center mt-5">
            <h1>🚫 No tienes permiso para acceder a esta página.</h1>
            <p>Contacta con el administrador si crees que esto es un error.</p>
            <button
                onClick={handleVolver}
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}
            >
                Volver
            </button>
        </div>
    );
};
