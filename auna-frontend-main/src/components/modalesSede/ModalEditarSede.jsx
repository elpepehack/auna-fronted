import React, { useState, useEffect } from 'react';

export const ModalEditarSede = ({ show, onClose, onUpdate, sedeActual }) => {
    const sedeInicial = {
        idSedes: '',
        nombreDistrito: '',
        nombreSede: ''
    };

    const [sede, setSede] = useState(sedeInicial);

    // ERRORES
    const [errorDistrito, setErrorDistrito] = useState("");
    const [errorNombreSede, setErrorNombreSede] = useState("");

    // Reiniciar formulario al abrir modal
    useEffect(() => {
        if (show && sedeActual) {
            setSede({
                idSedes: sedeActual.idSedes || '',
                nombreDistrito: sedeActual.nombreDistrito || '',
                nombreSede: sedeActual.nombreSede || ''
            });
            setErrorDistrito("");
            setErrorNombreSede("");
        }
    }, [show, sedeActual]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Solo letras y espacios
        const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/;
        if (!soloLetras.test(value)) return;

        setSede(prev => ({ ...prev, [name]: value }));

        // Limpiar errores al escribir
        if (name === "nombreDistrito") setErrorDistrito("");
        if (name === "nombreSede") setErrorNombreSede("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let valido = true;

        if (!sede.nombreDistrito || sede.nombreDistrito.trim() === "") {
            setErrorDistrito("El nombre del distrito es obligatorio");
            valido = false;
        }

        if (!sede.nombreSede || sede.nombreSede.trim() === "") {
            setErrorNombreSede("El nombre de la sede es obligatorio");
            valido = false;
        }

        if (!valido) return;

        onUpdate(sede.idSedes, sede);
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Sede</h5>
                        <button type="button" className="modal-closeBtn" onClick={onClose}></button>
                    </div>

                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            {/* DISTRITO */}
                            <div className="modal-formGroup">
                                <label className="modal-label">Distrito</label>
                                <input
                                    type="text"
                                    className={`modal-input ${errorDistrito ? "is-invalid" : ""}`}
                                    placeholder="Ingrese el nombre del distrito"
                                    name="nombreDistrito"
                                    value={sede.nombreDistrito}
                                    onChange={handleChange}
                                    maxLength={50}
                                />
                                {errorDistrito && <p style={{ color: "red", fontSize: "14px" }}>{errorDistrito}</p>}
                            </div>

                            {/* NOMBRE DE SEDE */}
                            <div className="modal-formGroup">
                                <label className="modal-label">Nombre de la sede</label>
                                <input
                                    type="text"
                                    className={`modal-input ${errorNombreSede ? "is-invalid" : ""}`}
                                    placeholder="Ingrese el nombre de la sede"
                                    name="nombreSede"
                                    value={sede.nombreSede}
                                    onChange={handleChange}
                                    maxLength={50}
                                />
                                {errorNombreSede && <p style={{ color: "red", fontSize: "14px" }}>{errorNombreSede}</p>}
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

export default ModalEditarSede;
