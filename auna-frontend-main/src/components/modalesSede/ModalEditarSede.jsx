import React, { useState, useEffect } from 'react'

export const ModalEditarSede = ({ show, onClose, onUpdate, sedeActual }) => {
    const [sede, setSede] = useState(sedeActual);

    useEffect(() => {
        setSede(sedeActual);
    }, [sedeActual]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSede(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(sede.idSedes, sede);
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Sedes</h5>
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
    )
}

export default ModalEditarSede;