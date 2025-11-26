import React, { useState, useEffect } from 'react';
import medicoService from '../../services/medicoService';
import ModalAgregarMedico from '../../components/modalesMedico/ModalAgregarMedico';
import ModalEditarMedico from '../../components/modalesMedico/ModalEditarMedico';
import ModalConfirmacion from '../../components/modalConfirmacion/ModalConfirmacion';

export const DashboardMedicos = () => {
    const [medicos, setMedicos] = useState([]);
    const [showModalAgregarMedico, setShowModalAgregarMedico] = useState(false);
    const [showModalEditarMedico, setShowModalEditarMedico] = useState(false);
    const [medicoSeleccionado, setMedicoSeleccionado] = useState(null);
    const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);
    const [resolverConfirmacion, setResolverConfirmacion] = useState(null);

    const listarMedicos = () => {
        medicoService.getAllMedicos().then(response => {
            setMedicos(response.data);
        }).catch(error => {
            console.log(error);
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
        listarMedicos();
    }, []);

    const handleSaveMedico = (nuevoMedico) => {
        console.log("Datos que se envían:", nuevoMedico);
        medicoService.createMedicos(nuevoMedico).then((response) => {
            listarMedicos();
            setShowModalAgregarMedico(false);
        }).catch(error => {
            console.log(error);
        });
    };

    const handleEditarClick = (medico) => {
        setMedicoSeleccionado(medico);
        setShowModalEditarMedico(true);
    };

    const handleUpdateMedico = (id, datosActualizados) => {
        medicoService.updateMedico(id, datosActualizados).then(() => {
            listarMedicos();
            setShowModalEditarMedico(false);
        }).catch(error => {
            console.log(error);
        });
    };

    const deleteMedico = async (idMedico) => {
        const confirmar = await mostrarConfirmacion("¿Está seguro que desea eliminar este médico? Esta operación no se puede deshacer.");
        if (!confirmar) return;

        medicoService.deleteMedico(idMedico).then(() => {
            listarMedicos();
        }).catch(error => {
            alert("Otra tabla depende de este Medico")
            console.log(error);
        });
    };

    return (
        <div className="container">
            <br />
            <div className="d-flex justify-content-between align-items-center my-3">
                <h2 className="text-center m-0">Lista de Médicos</h2>
                <button className="btn btn-primary" onClick={() => setShowModalAgregarMedico(true)}>
                    + Agregar Médico
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Especialidad</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicos.map(medico => (
                            <tr key={medico.idMedico}>
                                <td>{medico.idMedico}</td>
                                <td>{medico.nombreMedico}</td>
                                <td>{medico.especialidad?.nombreEspecialidad || '-'}</td>
                                <td>
                                    <div className="d-flex flex-column flex-md-row gap-2">
                                        <button className="btn btn-warning btn-sm" onClick={() => handleEditarClick(medico)}>Editar</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => deleteMedico(medico.idMedico)}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ModalAgregarMedico
                show={showModalAgregarMedico}
                onClose={() => setShowModalAgregarMedico(false)}
                onSave={handleSaveMedico}
            />

            {showModalEditarMedico && medicoSeleccionado && (
                <ModalEditarMedico
                    show={showModalEditarMedico}
                    onClose={() => setShowModalEditarMedico(false)}
                    onUpdate={handleUpdateMedico}
                    medicoActual={medicoSeleccionado}
                />
            )}

            {showModalConfirmacion && (
                <ModalConfirmacion
                    mensaje="¿Está seguro que desea eliminar este médico?"
                    onConfirm={() => manejarConfirmacion(true)}
                    onCancel={() => manejarConfirmacion(false)}
                />
            )}
        </div>
    );
};
