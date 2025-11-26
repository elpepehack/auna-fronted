import React, { useEffect, useState } from 'react';
import sedeService from '../../services/sedeService';
import detalleSedeService from '../../services/detalleSedeService';
import ModalAgregarSede from '../../components/modalesSede/ModalAgregarSede';
import ModalEditarSede from '../../components/modalesSede/ModalEditarSede';
import ModalConfirmacion from '../../components/modalConfirmacion/ModalConfirmacion';
import ModalEspecialidades from '../../components/modalesSede/ModalEspecialidades'; // el nuevo modal

export const DashboardSedes = () => {
    const [sedes, setSedes] = useState([]);
    const [showModalAgregarSede, setShowModalAgregarSede] = useState(false);
    const [showModalEditarSede, setShowModalEditarSede] = useState(false);
    const [sedeSeleccionada, setSedeSeleccionada] = useState(null);

    const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);
    const [resolverConfirmacion, setResolverConfirmacion] = useState(null);

    const [especialidades, setEspecialidades] = useState([]);
    const [showModalEspecialidades, setShowModalEspecialidades] = useState(false);
    const [nombreSedeActual, setNombreSedeActual] = useState('');

    const listarSedes = () => {
        sedeService.getAllSedes()
            .then(response => setSedes(response.data))
            .catch(error => console.log(error));
    };

    useEffect(() => {
        listarSedes();
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

    const handleSaveSede = (nuevaSede) => {
        sedeService.createSedes(nuevaSede).then(() => {
            listarSedes();
            setShowModalAgregarSede(false);
        }).catch(error => console.log(error));
    };

    const handleEditarClick = (sede) => {
        setSedeSeleccionada(sede);
        setShowModalEditarSede(true);
    };

    const handleUpdateSede = (id, datosActualizados) => {
        sedeService.updateSede(id, datosActualizados).then(() => {
            listarSedes();
            setShowModalEditarSede(false);
        }).catch(error => console.log(error));
    };

    const deleteSede = async (sedeId) => {
        const confirmar = await mostrarConfirmacion("¿Está seguro que desea eliminar esta sede? Esta operación no se puede deshacer.");
        if (!confirmar) return;

        sedeService.deleteSede(sedeId).then(() => {
            listarSedes();
        }).catch(error => {
            alert("Otra tabla depende de esta Sede");
            console.log(error);
        });
    };

    const mostrarEspecialidadesPorSede = (sede) => {
        detalleSedeService.getAllDetalleSedes()
            .then(response => {
                const detallesDeLaSede = response.data.filter(detalle => detalle.sede?.idSedes === sede.idSedes);
                setEspecialidades(detallesDeLaSede);
                setNombreSedeActual(sede.nombreSede);
                setShowModalEspecialidades(true);
            })
            .catch(error => {
                console.log(error);
                alert("No se pudieron cargar las especialidades.");
            });
    };

    return (
        <div className="container">
            <br />
            <div className="d-flex justify-content-between align-items-center my-3">
                <h2 className="text-center m-0">Lista de Sedes</h2>
                <button className="btn btn-primary" onClick={() => setShowModalAgregarSede(true)}>
                    + Agregar Sede
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Distrito</th>
                            <th>Nombre de la sede</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sedes.map(sede => (
                            <tr key={sede.idSedes}>
                                <td>{sede.idSedes}</td>
                                <td>{sede.nombreDistrito}</td>
                                <td>{sede.nombreSede}</td>
                                <td>
                                    <div className="d-flex flex-column flex-md-row gap-2">
                                        <button className='btn btn-info btn-sm'
                                            onClick={() => mostrarEspecialidadesPorSede(sede)}
                                        >
                                            Especialidades Disponibles
                                        </button>
                                        <button className="btn btn-warning btn-sm"
                                            onClick={() => handleEditarClick(sede)}
                                        >
                                            Editar
                                        </button>
                                        <button className="btn btn-danger btn-sm"
                                            onClick={() => deleteSede(sede.idSedes)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ModalAgregarSede
                show={showModalAgregarSede}
                onClose={() => setShowModalAgregarSede(false)}
                onSave={handleSaveSede}
            />

            {showModalEditarSede && sedeSeleccionada && (
                <ModalEditarSede
                    show={showModalEditarSede}
                    onClose={() => setShowModalEditarSede(false)}
                    onUpdate={handleUpdateSede}
                    sedeActual={sedeSeleccionada}
                />
            )}

            {showModalConfirmacion && (
                <ModalConfirmacion
                    mensaje="¿Está seguro que desea eliminar esta sede?"
                    onConfirm={() => manejarConfirmacion(true)}
                    onCancel={() => manejarConfirmacion(false)}
                />
            )}

            <ModalEspecialidades
                show={showModalEspecialidades}
                onClose={() => setShowModalEspecialidades(false)}
                especialidades={especialidades}
                nombreSede={nombreSedeActual}
            />
        </div>
    );
};

export default DashboardSedes;
