import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CitaService from '../../services/citaService';
import TurnoAtencionCitaService from '../../services/turnosAtencionCitasService';
import PacienteService from '../../services/pacienteService';

export const PagoExitoso = () => {
  const navigate = useNavigate();
  const ejecutado = useRef(false); // bandera

  useEffect(() => {
    const procesarCita = async () => {
      if (ejecutado.current) return; // 👈 evita doble ejecución
      ejecutado.current = true;

      try {
        const state = JSON.parse(localStorage.getItem("citaPendiente"));
        const usuario = JSON.parse(localStorage.getItem('usuario'));

        if (!usuario || !state) {
          alert("Datos de cita no encontrados.");
          return navigate("/");
        }

        const pacientesResponse = await PacienteService.getAllPacientes();
        const paciente = pacientesResponse.data.find(p => p.usuario.idUsuario === usuario.idUsuario);

        if (!paciente) {
          alert("No se encontró el paciente asociado al usuario.");
          return;
        }

        const nuevaCita = {
          paciente: { idPaciente: paciente.idPaciente },
          turnoAtencion: { idTurnosAtencionCitas: state.turnoId },
          horaCita: state.horario,
          estado: "POR_ATENDER"
        };

        await CitaService.createCitas(nuevaCita);

        const turnoResp = await TurnoAtencionCitaService.getTurnoAtencionCitaById(state.turnoId);
        const turnoActualizado = { ...turnoResp.data, numCupos: turnoResp.data.numCupos - 1 };
        await TurnoAtencionCitaService.updateTurnoAtencionCita(state.turnoId, turnoActualizado);

        localStorage.removeItem("citaPendiente");

        alert("¡Pago exitoso y cita reservada correctamente!");
        navigate("/");

      } catch (error) {
        console.error("Error procesando la cita:", error);
        alert("Ocurrió un error al registrar la cita después del pago.");
        navigate("/");
      }
    };

    procesarCita();
  }, [navigate]);

  return (
    <div className="container mt-5 text-center">
      <h3>✅ Pago exitoso</h3>
      <p>Estamos confirmando su cita...</p>
    </div>
  );
};
