import React, { useState } from 'react';

const ModalAgregarSede = ({ show, onClose, onSave }) => {
    const sedeInicial = {
        nombreDistrito: '',
        nombreSede: ''
    };

    const [sede, setSede] = useState(sedeInicial);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setSede(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(sede);
        setSede(sedeInicial);
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
                                <label className="modal-label">Distrito</label>
                                <input
                                    type="text"
                                    className="modal-input"
                                    placeholder="Ingrese el nombre del distrito"
                                    name="nombreDistrito"
                                    value={sede.nombreDistrito}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="modal-formGroup">
                                <label className="modal-label">Nombre de la sede</label>
                                <input
                                    type="text"
                                    className="modal-input"
                                    placeholder="Ingrese el nombre de la sede"
                                    name="nombreSede"
                                    value={sede.nombreSede}
                                    onChange={handleChange}
                                    required
                                />
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

export default ModalAgregarSede;