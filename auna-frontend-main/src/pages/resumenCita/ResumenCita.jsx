import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const ResumenCita = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) {
        return <div>No hay datos seleccionados. <button onClick={() => navigate(-1)}>Volver</button></div>
    }

    const handleReservar = async () => {
        try {
            // 1️⃣ Petición al backend para generar la preferencia de pago
            const response = await fetch("http://localhost:8080/api/v1/mercado");
            const urlPago = await response.text(); // backend devuelve la URL

            // 2️⃣ Guardamos temporalmente los datos de la cita en localStorage
            localStorage.setItem("citaPendiente", JSON.stringify(state));

            // 3️⃣ Redirigimos al Checkout de Mercado Pago
            window.location.href = urlPago;

        } catch (error) {
            console.error("Error generando el pago:", error);
            alert("No se pudo iniciar el pago.");
        }
    };


    return (
        <div className="container mt-5">
            <h3>Datos de su Cita</h3>
            <div className="mt-3 p-3 border rounded">
                <p><strong>Especialidad:</strong> {state.especialidad}</p>
                <p><strong>Día:</strong> {state.dia}</p>
                <p><strong>Horario:</strong> {state.horario}</p>
                <p><strong>Doctor:</strong> {state.medico}</p>
            </div>
            <div className="mt-4">
                <button className="btn btn-success mx-2" onClick={handleReservar}>
                    Reservar Cita
                </button>
                <button className="btn btn-secondary mx-2" onClick={() => navigate(-1)}>
                    Volver
                </button>
            </div>
        </div>
    );
};
