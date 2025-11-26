import React, { useState } from 'react';

const ModalAgregarEspecialidad = ({ show, onClose, onSave }) => {

    const especialidadInicial = {
        nombreEspecialidad: '',
        descripcion: ''
    };

    const [especialidad, setEspecialidad] = useState(especialidadInicial);

    // ❗ Mensajes rojos
    const [errorNombre, setErrorNombre] = useState("");
    const [errorDescripcion, setErrorDescripcion] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Solo letras para nombre
        if (name === "nombreEspecialidad") {
            const soloLetras = value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, "");
            setEspecialidad(prev => ({ ...prev, nombreEspecialidad: soloLetras }));
            setErrorNombre("");
            return;
        }

        // Solo letras + .,; en descripción
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

        // Validación Nombre
        if (especialidad.nombreEspecialidad.trim() === "") {
            setErrorNombre("El nombre de la especialidad es obligatorio");
            valido = false;
        }

        // Validación Descripción
        if (especialidad.descripcion.trim() === "") {
            setErrorDescripcion("La descripción es obligatoria");
            valido = false;
        }

        if (!valido) return;

        // Guardar
        onSave(especialidad);
        setEspecialidad(especialidadInicial);
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">Registro</h5>
                        <button type="button" className="modal-closeBtn" onClick={onClose}></button>
                    </div>

                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>

                            {/* NOMBRE */}
                            <div className="modal-formGroup">
                                <label className="modal-label">Nombre</label>
                                <input
                                    type="text"
                                    className="modal-input"
                                    placeholder="Ingrese el nombre"
                                    name="nombreEspecialidad"
                                    value={especialidad.nombreEspecialidad}
                                    onChange={handleChange}
                                />

                                {errorNombre && (
                                    <p style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
                                        {errorNombre}
                                    </p>
                                )}
                            </div>

                            {/* DESCRIPCIÓN */}
                            <div className="modal-formGroup">
                                <label className="modal-label">Descripción</label>
                                <textarea
                                    className="modal-textarea"
                                    placeholder="Ingrese la descripción"
                                    name="descripcion"
                                    value={especialidad.descripcion}
                                    onChange={handleChange}
                                    rows={4}
                                    maxLength={100}
                                />

                                {errorDescripcion && (
                                    <p style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
                                        {errorDescripcion}
                                    </p>
                                )}

                                <small className="text-muted">
                                    {especialidad.descripcion.length}/100 caracteres
                                </small>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="modal-btn modal-btnSecondary"
                                    onClick={onClose}
                                >
                                    CANCELAR
                                </button>

                                <button type="submit" className="modal-btn modal-btnPrimary">
                                    GUARDAR REGISTRO
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ModalAgregarEspecialidad;
