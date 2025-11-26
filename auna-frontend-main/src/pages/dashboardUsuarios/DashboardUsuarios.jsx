import React, { useEffect, useState } from 'react';
import usuarioService from '../../services/usuarioService';
import ModalAgregarUsuario from '../../components/modalesUsuario/ModalAgregarUsuario'
import ModalEditarUsuario from '../../components/modalesUsuario/ModalEditarUsuario';
import ModalConfirmacion from '../../components/modalConfirmacion/ModalConfirmacion';

export const DashboardUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [showModalAgregarUsuario, setShowModalAgregarUsuario] = useState(false);
    const [showModalEditarUsuario, setShowModalEditarUsuario] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    //
    const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);
    const [resolverConfirmacion, setResolverConfirmacion] = useState(null);

    const listarUsuarios = () => {
        usuarioService.getAllUsuarios().then(response => {
            setUsuarios(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

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

    //Listar los usuarios
    useEffect(() => {
        listarUsuarios();
    }, []);

    // Guardar nuevo usuario
    const handleSaveUsuario = (nuevoUsuario) => {
        const celularExistente = usuarios.some(u => u.numeroCelular === nuevoUsuario.numeroCelular);
        const documentoExistente = usuarios.some(u => u.numDocumento === nuevoUsuario.numDocumento);

        if (celularExistente) {
            alert("El número de celular ya está registrado.");
            return;
        }

        if (documentoExistente) {
            alert("El número de documento ya está registrado.");
            return;
        }

        usuarioService.createUsuarios(nuevoUsuario)
            .then((response) => {
                console.log(response.data);
                listarUsuarios();
                setShowModalAgregarUsuario(false);
            })
            .catch(error => {
                console.log(error);
                alert("Ocurrió un error al guardar el usuario.");
            });
    };


    // Abrir modal y cargar usuario a editar
    const handleEditarClick = (usuario) => {
        setUsuarioSeleccionado(usuario);
        setShowModalEditarUsuario(true);
    };

    // Guardar cambios editados
    const handleUpdateUsuario = (id, datosActualizados) => {
        usuarioService.updateUsuario(id, datosActualizados).then(() => {
            listarUsuarios();
            setShowModalEditarUsuario(false);
        }).catch(error => {
            console.error("Error al actualizar:", error);
        });
    };

    // Eliminar usuario
    const deleteUsuario = async (usuarioId) => {
        const confirmar = await mostrarConfirmacion("¿Está seguro que desea eliminar este usuario? Esta operación no se puede deshacer.");
        if (!confirmar) return;

        usuarioService.deleteUsuario(usuarioId).then(() => {
            listarUsuarios();
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="container">
            <br />

            {/* Encabezado y botón */}
            <div className="d-flex justify-content-between align-items-center my-3">
                <h2 className="text-center m-0">Lista de usuarios</h2>
                <button className="btn btn-primary" onClick={() => setShowModalAgregarUsuario(true)}>
                    + Agregar Usuario
                </button>
            </div>

            {/* Contenedor responsive */}
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Correo Electrónico</th>
                            <th>Número de celular</th>
                            <th>Tipo de usuario</th>
                            <th>Tipo de documento</th>
                            <th>Número de documento</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(usuario => (
                            <tr key={usuario.idUsuario}>
                                <td>{usuario.idUsuario}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apellido}</td>
                                <td>{usuario.correoElectronico}</td>
                                <td>{usuario.numeroCelular}</td>
                                <td>{usuario.tipoUsuario}</td>
                                <td>{usuario.tipoDocumento}</td>
                                <td>{usuario.numDocumento}</td>
                                <td>
                                    <div className="d-flex flex-column flex-md-row gap-2">
                                        <button className="btn btn-warning btn-sm" onClick={() => handleEditarClick(usuario)}>Editar</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => deleteUsuario(usuario.idUsuario)}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <ModalAgregarUsuario
                show={showModalAgregarUsuario}
                onClose={() => setShowModalAgregarUsuario(false)}
                onSave={handleSaveUsuario}
            />

            {showModalEditarUsuario && usuarioSeleccionado && (
                <ModalEditarUsuario
                    show={showModalEditarUsuario}
                    onClose={() => setShowModalEditarUsuario(false)}
                    onUpdate={handleUpdateUsuario}
                    usuarioActual={usuarioSeleccionado}
                />
            )}

            {showModalConfirmacion && (
                <ModalConfirmacion
                    mensaje="¿Está seguro que desea eliminar este usuario?"
                    onConfirm={() => manejarConfirmacion(true)}
                    onCancel={() => manejarConfirmacion(false)}
                />
            )}


        </div>
    );
};
