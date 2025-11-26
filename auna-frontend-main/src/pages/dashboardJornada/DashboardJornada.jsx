import React, { useEffect, useState } from 'react';
import jornadaService from '../../services/jornadaMedicoService';
import ModalAgregarJornada from '../../components/modalesJornada/ModalAgregarJornada';
import ModalEditarJornada from '../../components/modalesJornada/ModalEditarJornada';
import ModalConfirmacion from '../../components/modalConfirmacion/ModalConfirmacion';

export const DashboardJornada = () => {
    const [jornadas, setJornadas] = useState([]);
    const [showModalAgregarJornada, setShowModalAgregarJornada] = useState(false);
    const [showModalEditarJornada, setShowModalEditarJornada] = useState(false);
    const [jornadaSeleccionada, setJornadaSeleccionada] = useState(null);
    const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);
    const [resolverConfirmacion, setResolverConfirmacion] = useState(null);

    const listarJornadas = () => {
        jornadaService.getAllJornadaMedicos()
            .then(response => setJornadas(response.data))
            .catch(error => console.error(error));
    };

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

    useEffect(() => {
        listarJornadas();
    }, []);

    const handleSaveJornada = (nuevaJornada) => {

        console.log(nuevaJornada);
        jornadaService.createJornadaMedicos(nuevaJornada)
            .then(() => {
                listarJornadas();
                setShowModalAgregarJornada(false);
            })
            .catch(error => console.error(error));
    };

    const handleEditarClick = (jornada) => {
        setJornadaSeleccionada(jornada);
        setShowModalEditarJornada(true);
    };

    const handleUpdateJornada = (id, datosActualizados) => {
        jornadaService.updateJornadaMedico(id, datosActualizados)
            .then(() => {
                listarJornadas();
                setShowModalEditarJornada(false);
            })
            .catch(error => console.error("Error al actualizar:", error));
    };

    const deleteJornada = async (idJornada) => {
        const confirmar = await mostrarConfirmacion("¿Está seguro que desea eliminar esta jornada?");
        if (!confirmar) return;

        jornadaService.deleteJornadaMedico(idJornada)
            .then(() => listarJornadas())
            .catch(error => console.error(error));
    };

    return (
        <div className="container">
            <br />
            <div className="d-flex justify-content-between align-items-center my-3">
                <h2 className="text-center m-0">Lista de Jornadas</h2>
                <button className="btn btn-primary" onClick={() => setShowModalAgregarJornada(true)}>
                    + Agregar Jornada
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Médico</th>
                            <th>Día</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jornadas.map(j => (
                            <tr key={j.idJornadaMedicos}>
                                <td>{j.idJornadaMedicos}</td>
                                <td>{j.medico.nombreMedico}</td>
                                <td>{j.diaSemana}</td>
                                <td>
                                    <div className="d-flex flex-column flex-md-row gap-2">
                                        <button className="btn btn-warning btn-sm" onClick={() => handleEditarClick(j)}>Editar</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => deleteJornada(j.idJornadaMedicos)}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ModalAgregarJornada
                show={showModalAgregarJornada}
                onClose={() => setShowModalAgregarJornada(false)}
                onSave={handleSaveJornada}
            />

            {showModalEditarJornada && jornadaSeleccionada && (
                <ModalEditarJornada
                    show={showModalEditarJornada}
                    onClose={() => setShowModalEditarJornada(false)}
                    onUpdate={handleUpdateJornada}
                    jornadaActual={jornadaSeleccionada}
                />
            )}

            {showModalConfirmacion && (
                <ModalConfirmacion
                    mensaje="¿Está seguro que desea eliminar esta jornada?"
                    onConfirm={() => manejarConfirmacion(true)}
                    onCancel={() => manejarConfirmacion(false)}
                />
            )}
        </div>
    );
};
