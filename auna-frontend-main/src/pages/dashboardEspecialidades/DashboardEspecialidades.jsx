import React, { useEffect, useState } from 'react';
import especialidadService from '../../services/especialidadService';
import ModalAgregarEspecialidad from '../../components/modalesEspecialidad/ModalAgregarEspecialidad';
import ModalEditarEspecialidad from '../../components/modalesEspecialidad/ModalEditarEspecialidad';
import ModalConfirmacion from '../../components/modalConfirmacion/ModalConfirmacion';

export const DashboardEspecialidades = () => {
    const [especialidades, setEspecialidades] = useState([]);
    const [showModalAgregarEspecialidad, setShowModalAgregarEspecialidad] = useState(false);
    const [showModalEditarEspecialidad, setShowModalEditarEspecialidad] = useState(false);
    const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState(null);
    const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);
    const [resolverConfirmacion, setResolverConfirmacion] = useState(null);

    const listarEspecialidades = () => {
        especialidadService.getAllEspecialidades().then(response => {
            setEspecialidades(response.data);
        }).catch(error => {
            console.error(error);
        });
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
        listarEspecialidades();
    }, []);

    const handleSaveEspecialidad = (nuevaEspecialidad) => {
        especialidadService.createEspecialidades(nuevaEspecialidad).then(() => {
            listarEspecialidades();
            setShowModalAgregarEspecialidad(false);
        }).catch(error => {
            console.error(error);
        });
    };

    const handleEditarClick = (especialidad) => {
        setEspecialidadSeleccionada(especialidad);
        setShowModalEditarEspecialidad(true);
    };

    const handleUpdateEspecialidad = (id, datosActualizados) => {
        especialidadService.updateEspecialidad(id, datosActualizados).then(() => {
            listarEspecialidades();
            setShowModalEditarEspecialidad(false);
        }).catch(error => {
            console.error(error);
        });
    };

    const deleteEspecialidad = async (idEspecialidad) => {
        const confirmar = await mostrarConfirmacion("¿Está seguro que desea eliminar esta especialidad? Esta operación no se puede deshacer.");
        if (!confirmar) return;

        especialidadService.deleteEspecialidad(idEspecialidad).then(() => {
            listarEspecialidades();
        }).catch(error => {
            if (error.response && error.response.status === 500) {
                alert("No se puede eliminar la especialidad porque otras tablas dependen de ella. Elimine esas dependencias primero.");
            } else {
                console.error("Error al eliminar la especialidad:", error);
                alert("Ocurrió un error inesperado al intentar eliminar la especialidad.");
            }
        });
    };

    return (
        <div className="container">
            <br />
            <div className="d-flex justify-content-between align-items-center my-3">
                <h2 className="text-center m-0">Lista de Especialidades</h2>
                <button className="btn btn-primary" onClick={() => setShowModalAgregarEspecialidad(true)}>
                    + Agregar Especialidad
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {especialidades.map(especialidad => (
                            <tr key={especialidad.idEspecialidad}>
                                <td>{especialidad.idEspecialidad}</td>
                                <td>{especialidad.nombreEspecialidad}</td>
                                <td>{especialidad.descripcion}</td>
                                <td>
                                    <div className="d-flex flex-column flex-md-row gap-2">
                                        <button className="btn btn-warning btn-sm" onClick={() => handleEditarClick(especialidad)}>Editar</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => deleteEspecialidad(especialidad.idEspecialidad)}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ModalAgregarEspecialidad
                show={showModalAgregarEspecialidad}
                onClose={() => setShowModalAgregarEspecialidad(false)}
                onSave={handleSaveEspecialidad}
            />

            {showModalEditarEspecialidad && especialidadSeleccionada && (
                <ModalEditarEspecialidad
                    show={showModalEditarEspecialidad}
                    onClose={() => setShowModalEditarEspecialidad(false)}
                    onUpdate={handleUpdateEspecialidad}
                    especialidadActual={especialidadSeleccionada}
                />
            )}

            {showModalConfirmacion && (
                <ModalConfirmacion
                    mensaje="¿Está seguro que desea eliminar esta especialidad?"
                    onConfirm={() => manejarConfirmacion(true)}
                    onCancel={() => manejarConfirmacion(false)}
                />
            )}
        </div>
    );
};
