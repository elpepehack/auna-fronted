import React, { useEffect, useState } from 'react';
import citaService from '../../services/citaService';
import pacienteService from '../../services/pacienteService';
import './HomeHistorial.css'

export const HomeHistorial = () => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarCitasPaciente = () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log("Contenido de localStorage usuario:", usuario);

    if (!usuario) {
      console.error("No hay usuario en localStorage");
      return;
    }

    pacienteService.getAllPacientes()
      .then(response => {
        console.log("Pacientes obtenidos:", response.data);

        const pacienteEncontrado = response.data.find(p => 
          p.usuario && p.usuario.idUsuario === usuario.idUsuario
        );

        if (!pacienteEncontrado) {
          console.error("No se encontró paciente para el usuario logueado");
          setLoading(false);
          return;
        }

        console.log("Paciente encontrado:", pacienteEncontrado);

        return citaService.getCitasPorIDPaciente(pacienteEncontrado.idPaciente);
      })
      .then(response => {
        if (!response) return;

        console.log("Citas recibidas:", response.data);

        // Asegúrate de que response.data sea array
        const citasOrdenadas = Array.isArray(response.data)
          ? response.data.sort((a, b) => {
              if (a.turnoAtencion.fecha !== b.turnoAtencion.fecha) {
                return new Date(a.turnoAtencion.fecha) - new Date(b.turnoAtencion.fecha);
              }
              return a.horaCita.localeCompare(b.horaCita);
            })
          : [];

        setCitas(citasOrdenadas);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al cargar citas:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    cargarCitasPaciente();
  }, []);

  const cancelarCita = (cita) => {
    const confirmar = window.confirm(`¿Estás seguro que deseas cancelar la cita del ${new Date(cita.turnoAtencion.fecha).toLocaleDateString()} a las ${cita.horaCita}?`);
    if (!confirmar) return;

    const citaActualizada = {
      ...cita,
      paciente: { idPaciente: cita.paciente.idPaciente },
      turnoAtencion: { idTurnosAtencionCitas: cita.turnoAtencion.idTurnosAtencionCitas },
      horaCita: cita.horaCita,
      estado: "CANCELADA"
    };

    citaService.updateCita(cita.idCita, citaActualizada)
      .then(() => {
        alert("Cita cancelada exitosamente.");
        cargarCitasPaciente();
      })
      .catch(error => {
        console.error("Error al cancelar la cita:", error);
        alert("Hubo un error al cancelar la cita.");
      });
  };

  return (
    <>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Mis Citas</h2>

        {loading ? (
          <div className="alert alert-info text-center">Cargando citas...</div>
        ) : citas.length === 0 ? (
          <div className="alert alert-info text-center">No tienes citas registradas.</div>
        ) : (
          <div className="row">
            {citas.map((cita, idx) => (
              <div key={idx} className="col-md-6 col-lg-4 mb-4">
                <div className={`card shadow-sm h-100 border ${cita.estado === 'POR_ATENDER' ? 'border-primary' :
                  cita.estado === 'ATENDIDA' ? 'border-success' : 'border-danger'}`}>
                  <div className="card-body">
                    <h5 className="card-title mb-3">
                      <i className="bi bi-calendar-event"></i> {new Date(cita.turnoAtencion.fecha + 'T00:00:00').toLocaleDateString()}
                    </h5>
                    <p className="card-text mb-2"><strong>Hora:</strong> {cita.horaCita}</p>
                    <p className="card-text mb-2"><strong>Médico:</strong> {cita.turnoAtencion.medico?.nombreMedico || 'No asignado'}</p>
                    <p className="card-text mb-2"><strong>Especialidad:</strong> {cita.turnoAtencion.detalleSede?.especialidad?.nombreEspecialidad}</p>
                    <p className="card-text mb-2"><strong>Sede:</strong> {cita.turnoAtencion.detalleSede?.sede?.nombreSede}</p>
                    <span className={`badge ${cita.estado === 'POR_ATENDER' ? 'bg-primary' :
                      cita.estado === 'ATENDIDA' ? 'bg-success' : 'bg-danger'}`}>
                      {cita.estado.replace('_', ' ')}
                    </span>
                    {cita.estado === "POR_ATENDER" && (
                      <div className="mt-3 text-center">
                        <button className="btn btn-outline-danger btn-sm" onClick={() => cancelarCita(cita)}>
                          Cancelar Cita
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
