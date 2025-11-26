import React, { useEffect, useState } from 'react';
import turnoService from '../../services/turnosAtencionCitasService';
import ModalAgregarTurno from '../../components/modalesTurnoAtencion/ModalAgregarTurno';
import ModalConfirmacion from '../../components/modalConfirmacion/ModalConfirmacion';
import { useNavigate } from "react-router-dom";


export const DashboardTurnosAtencion = () => {
    const [turnos, setTurnos] = useState([]);
    const [showModalAgregarTurno, setShowModalAgregarTurno] = useState(false);
    const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);
    const [resolverConfirmacion, setResolverConfirmacion] = useState(null);

    const navigate = useNavigate();


    const listarTurnos = () => {
        turnoService.getAllTurnosAtencionCitas()
            .then(response => setTurnos(response.data))
            .catch(error => console.error(error));
    };

    useEffect(() => {
        listarTurnos();
    }, []);

    const mostrarConfirmacion = (mensaje) => {
        return new Promise((resolve) => {
            setResolverConfirmacion(() => resolve);
            setShowModalConfirmacion(true);
        });
    };

    const manejarConfirmacion = (respuesta) => {
        setShowModalConfirmacion(false);
        if (resolverConfirmacion) resolverConfirmacion(respuesta);
    };

    const handleSaveTurno = (nuevoTurno) => {
        turnoService.createTurnosAtencionCitas(nuevoTurno)
            .then(() => {
                listarTurnos();
                setShowModalAgregarTurno(false);
            })
            .catch(error => console.error(error));
    };

    const deleteTurno = async (idTurno) => {
        const confirmar = await mostrarConfirmacion("¿Está seguro que desea eliminar este turno?");
        if (!confirmar) return;

        turnoService.deleteTurnoAtencionCita(idTurno)
            .then(() => listarTurnos())
            .catch(error => console.error(error));
    };

    return (
        <div className="container">
            <br />
            <div className="d-flex justify-content-between align-items-center my-3">
                <div>
                    <button className="btn btn-secondary me-2" onClick={() => navigate("/dashboard/moduloCitas")}>
                        Ver Citas
                    </button>
                </div>
                <h2 className="text-center m-0 flex-grow-1">Turnos de Atención</h2>
                <button className="btn btn-primary" onClick={() => setShowModalAgregarTurno(true)}>
                    + Agregar Turno
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Sede</th>
                            <th>Especialidad</th>
                            <th>Médico</th>
                            <th>Fecha</th>
                            <th>Hora Inicio</th>
                            <th>Hora Fin</th>
                            <th>Cupos</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {turnos.map(turno => (
                            <tr key={turno.idTurnosAtencionCitas}>
                                <td>{turno.idTurnosAtencionCitas}</td>
                                <td>{turno.detalleSede?.sede?.nombreSede || '-'}</td>
                                <td>{turno.detalleSede?.especialidad?.nombreEspecialidad || '-'}</td>
                                <td>{turno.medico?.nombreMedico || '-'}</td>
                                <td>{turno.fecha}</td>
                                <td>{turno.horaInicio}</td>
                                <td>{turno.horaFin}</td>
                                <td>{turno.numCupos}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => deleteTurno(turno.idTurnosAtencionCitas)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ModalAgregarTurno
                show={showModalAgregarTurno}
                onClose={() => setShowModalAgregarTurno(false)}
                onSave={handleSaveTurno}
            />

            {showModalConfirmacion && (
                <ModalConfirmacion
                    mensaje="¿Está seguro que desea eliminar este turno?"
                    onConfirm={() => manejarConfirmacion(true)}
                    onCancel={() => manejarConfirmacion(false)}
                />
            )}
        </div>
    );
};

export default DashboardTurnosAtencion;
