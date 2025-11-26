import React, { useState } from 'react';

const ModalAgregarEspecialidad = ({ show, onClose, onSave }) => {
    const especialidadInicial = {
        nombreEspecialidad: '',
        descripcion: ''
    };

    const [especialidad, setEspecialidad] = useState(especialidadInicial);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEspecialidad(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
                        <button
                            type="button"
                            className="modal-closeBtn"
                            onClick={onClose}
                        ></button>
                    </div>

                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="modal-formGroup">
                                <label className="modal-label">Nombre</label>
                                <input
                                    type="text"
                                    className="modal-input"
                                    placeholder="Ingrese su nombre"
                                    name="nombreEspecialidad"
                                    value={especialidad.nombreEspecialidad}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="modal-formGroup">
                                <label className="modal-label">Descripción</label>
                                <textarea
                                    className="modal-textarea"
                                    placeholder="Ingrese su descripcion"
                                    name="descripcion"
                                    value={especialidad.descripcion}
                                    onChange={handleChange}
                                    rows={4}
                                    maxLength={100}
                                    required
                                />
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
                                <button
                                    type="submit"
                                    className="modal-btn modal-btnPrimary"
                                >
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