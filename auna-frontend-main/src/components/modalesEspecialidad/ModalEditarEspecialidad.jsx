import React, { useState, useEffect } from 'react';

export const ModalEditarEspecialidad = ({ show, onClose, onUpdate, especialidadActual }) => {

    const especialidadInicial = {
        idEspecialidad: '',
        nombreEspecialidad: '',
        descripcion: ''
    };

    const [especialidad, setEspecialidad] = useState(especialidadInicial);

    // Errores
    const [errorNombre, setErrorNombre] = useState("");
    const [errorDescripcion, setErrorDescripcion] = useState("");

    // Reiniciar formulario al abrir modal
    useEffect(() => {
        if (show && especialidadActual) {
            setEspecialidad({
                idEspecialidad: especialidadActual.idEspecialidad || '',
                nombreEspecialidad: especialidadActual.nombreEspecialidad || '',
                descripcion: especialidadActual.descripcion || ''
            });
            setErrorNombre("");
            setErrorDescripcion("");
        }
    }, [show, especialidadActual]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "nombreEspecialidad") {
            const soloLetras = value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, "");
            setEspecialidad(prev => ({ ...prev, nombreEspecialidad: soloLetras }));
            setErrorNombre("");
            return;
        }

        if (name === "descripcion") {
            const filtrado = value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s.,;]/g, "");
            setEspecialidad(prev => ({ ...prev, descripcion: filtrado }));
            setErrorDescripcion("");
            return;
        }

        setEspecialidad(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let valido = true;

        if (especialidad.nombreEspecialidad.trim() === "") {
            setErrorNombre("El nombre de la especialidad es obligatorio");
            valido = false;
        }

        if (especialidad.descripcion.trim() === "") {
            setErrorDescripcion("La descripción es obligatoria");
            valido = false;
        }

        if (!valido) return;

        onUpdate(especialidad.idEspecialidad, especialidad);
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">Editar Especialidad</h5>
                        <button type="button" className="modal-closeBtn" onClick={onClose}></button>
                    </div>

                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>

                            {/* NOMBRE */}
                            <div className="modal-formGroup">
                                <label className="modal-label">Nombre</label>
                                <input
                                    type="text"
                                    className={`modal-input ${errorNombre ? "is-invalid" : ""}`}
                                    placeholder="Ingrese el nombre"
                                    name="nombreEspecialidad"
                                    value={especialidad.nombreEspecialidad}
                                    onChange={handleChange}
                                    maxLength={50}
                                />
                                {errorNombre && <p style={{ color: "red", fontSize: "14px" }}>{errorNombre}</p>}
                            </div>

                            {/* DESCRIPCIÓN */}
                            <div className="modal-formGroup">
                                <label className="modal-label">Descripción</label>
                                <textarea
                                    className={`modal-textarea ${errorDescripcion ? "is-invalid" : ""}`}
                                    placeholder="Ingrese la descripción"
                                    name="descripcion"
                                    value={especialidad.descripcion}
                                    onChange={handleChange}
                                    rows={4}
                                    maxLength={100}
                                />
                                {errorDescripcion && <p style={{ color: "red", fontSize: "14px" }}>{errorDescripcion}</p>}
                                <small className="text-muted">{especialidad.descripcion.length}/100 caracteres</small>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="modal-btn modal-btnSecondary" onClick={onClose}>
                                    CANCELAR
                                </button>
                                <button type="submit" className="modal-btn modal-btnPrimary">
                                    GUARDAR CAMBIOS
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ModalEditarEspecialidad;
