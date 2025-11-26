import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CitaService from '../../services/citaService';
import ModalConfirmacion from '../../components/modalConfirmacion/ModalConfirmacion';

export const DashboardCitas = () => {
    const [citas, setCitas] = useState([]);
    const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);
    const [resolverConfirmacion, setResolverConfirmacion] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        listarCitas();
    }, []);

    const listarCitas = () => {
        CitaService.getAllCitas()
            .then(response => setCitas(response.data))
            .catch(error => console.error(error));
    };

    const mostrarConfirmacion = () => {
        return new Promise((resolve) => {
            setResolverConfirmacion(() => resolve);
            setShowModalConfirmacion(true);
        });
    };

    const manejarConfirmacion = (respuesta) => {
        setShowModalConfirmacion(false);
        if (resolverConfirmacion) resolverConfirmacion(respuesta);
    };

    const deleteCita = async (idCita) => {
        const confirmar = await mostrarConfirmacion();
        if (!confirmar) return;

        CitaService.deleteCita(idCita)
            .then(() => listarCitas())
            .catch(error => console.error(error));
    };

    const marcarComoAtendida = async (cita) => {
        const confirmar = await mostrarConfirmacion();
        if (!confirmar) return;

        const citaActualizada = {
            ...cita,
            paciente: { idPaciente: cita.paciente.idPaciente },
            turnoAtencion: { idTurnosAtencionCitas: cita.turnoAtencion.idTurnosAtencionCitas },
            estado: "ATENDIDA"
        };

        CitaService.updateCita(cita.idCita, citaActualizada)
            .then(() => listarCitas())
            .catch(error => console.error(error));
    };

    return (
        <div className="container">
            <br />
            <div className="d-flex justify-content-between align-items-center my-3">
                <button className="btn btn-secondary" onClick={() => navigate('/dashboard/moduloTurnos')}>
                    Volver a Turnos
                </button>
                <h2 className="text-center m-0 flex-grow-1">Citas Registradas</h2>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Paciente</th>
                            <th>Turno ID</th>
                            <th>Fecha Turno</th>
                            <th>Hora Cita</th>
                            <th>Estado</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citas.map(cita => (
                            <tr key={cita.idCita}>
                                <td>{cita.idCita}</td>
                                <td>{cita.paciente?.usuario?.nombre} {cita.paciente?.usuario?.apellido}</td>
                                <td>{cita.turnoAtencion?.idTurnosAtencionCitas}</td>
                                <td>{cita.turnoAtencion?.fecha}</td>
                                <td>{cita.horaCita}</td>
                                <td>{cita.estado}</td>
                                <td className="d-flex gap-1">
                                    <button className="btn btn-danger btn-sm" onClick={() => deleteCita(cita.idCita)}>
                                        Eliminar
                                    </button>
                                    {cita.estado !== "ATENDIDA" && (
                                        <button className="btn btn-success btn-sm" onClick={() => marcarComoAtendida(cita)}>
                                            Dar por Atendida
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModalConfirmacion && (
                <ModalConfirmacion
                    mensaje="¿Está seguro que desea realizar esta acción?"
                    onConfirm={() => manejarConfirmacion(true)}
                    onCancel={() => manejarConfirmacion(false)}
                />
            )}
        </div>
    );
};

export default DashboardCitas;
