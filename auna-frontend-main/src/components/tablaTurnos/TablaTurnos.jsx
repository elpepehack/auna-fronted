import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import turnosService from '../../services/turnosAtencionCitasService';

export const TablaTurnos = ({ idSede, idEspecialidad }) => {
    const [turnos, setTurnos] = useState([]);
    const [seleccion, setSeleccion] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        turnosService.getAllTurnosAtencionCitas()
            .then(response => {
                const turnosFiltrados = response.data.filter(turno =>
                    turno.detalleSede.sede.idSedes === idSede &&
                    turno.detalleSede.especialidad.idEspecialidad === idEspecialidad
                );

                turnosFiltrados.sort((a, b) => {
                    if (a.fecha !== b.fecha) {
                        return new Date(a.fecha) - new Date(b.fecha);
                    }
                    return a.horaInicio.localeCompare(b.horaInicio);
                });

                setTurnos(turnosFiltrados);
            })
            .catch(error => console.error("Error al cargar turnos:", error));
    }, [idSede, idEspecialidad]);

    const generarOpcionesHora = (horaInicio, cupos, horaFin) => {
        const opciones = [];
        let [h, m] = horaInicio.split(':').map(Number);
        const [hFin, mFin] = horaFin.split(':').map(Number);

        for (let i = 0; i < cupos; i++) {
            if (h > hFin || (h === hFin && m > mFin)) break;
            opciones.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
            h += 1;
        }

        return opciones;
    };

    const handleSeleccionHorario = (turno, hora) => {
        setSeleccion({
            turnoId: turno.idTurnosAtencionCitas,
            especialidad: turno.detalleSede.especialidad.nombreEspecialidad,
            medico: turno.medico.nombreMedico,
            dia: turno.fecha,
            horario: hora
        });
    };

    const handleSiguiente = () => {
        navigate('/reservaCitas/resumen-cita', { state: seleccion });
    };

    return (
        <>
            <div className="table-responsive mt-4">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Horario</th>
                            <th>Cupos</th>
                            <th>Médico</th>
                            <th>Estado</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {turnos.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No hay turnos disponibles para esta especialidad en esta sede.
                                </td>
                            </tr>
                        )}
                        {turnos.map((turno, idx) => {
                            const opciones = turno.numCupos > 0
                                ? generarOpcionesHora(turno.horaInicio, turno.numCupos, turno.horaFin)
                                : [];
                            return (
                                <tr key={idx}>
                                    <td>{turno.fecha}</td>
                                    <td>{`${turno.horaInicio} - ${turno.horaFin}`}</td>
                                    <td>{turno.numCupos}</td>
                                    <td>{turno.medico?.nombreMedico || '-'}</td>
                                    <td>
                                        {turno.numCupos > 0
                                            ? <span className="badge bg-primary">Disponible</span>
                                            : <span className="badge bg-secondary">No Disponible</span>
                                        }
                                    </td>
                                    <td>
                                        {opciones.length > 0 ? (
                                            opciones.map((hora, i) => (
                                                <button
                                                    key={i}
                                                    className={`btn btn-sm mx-1 ${seleccion?.turnoId === turno.idTurnosAtencionCitas && seleccion?.horario === hora
                                                        ? 'btn-success'
                                                        : 'btn-outline-success'
                                                        }`}
                                                    onClick={() => handleSeleccionHorario(turno, hora)}
                                                    disabled={i !== opciones.length - 1} // SOLO PERMITE EL ÚLTIMO
                                                >
                                                    {hora}
                                                </button>
                                            ))
                                        ) : <span>-</span>}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {seleccion && (
                <div className="text-center mt-3">
                    <button className="btn btn-primary" onClick={handleSiguiente}>
                        Siguiente
                    </button>
                </div>
            )}
        </>
    );
};
