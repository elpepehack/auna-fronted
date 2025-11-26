import React, { useState } from 'react';

const ModalAgregarSede = ({ show, onClose, onSave }) => {
    const sedeInicial = {
        nombreDistrito: '',
        nombreSede: ''
    };

    const [sede, setSede] = useState(sedeInicial);

    // ERRORES
    const [errorDistrito, setErrorDistrito] = useState("");
    const [errorNombreSede, setErrorNombreSede] = useState("");

    // SOLO LETRAS
    const handleKeyDownLetras = (e) => {
        const key = e.key;

        const permitido = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]$/.test(key);

        if (!permitido && key !== "Backspace" && key !== "Tab") {
            e.preventDefault();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setSede(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === "nombreDistrito") setErrorDistrito("");
        if (name === "nombreSede") setErrorNombreSede("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let valido = true;

        // VALIDAR DISTRITO
        if (sede.nombreDistrito.trim() === "") {
            setErrorDistrito("El nombre del distrito es obligatorio");
            valido = false;
        }

        // VALIDAR NOMBRE DE SEDE
        if (sede.nombreSede.trim() === "") {
            setErrorNombreSede("El nombre de la sede es obligatorio");
            valido = false;
        }

        if (!valido) return;

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

                            {/* DISTRITO */}
                            <div className="modal-formGroup">
                                <label className="modal-label">Distrito</label>

                                <input
                                    type="text"
                                    className="modal-input"
                                    placeholder="Ingrese el nombre del distrito"
                                    name="nombreDistrito"
                                    value={sede.nombreDistrito}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDownLetras}
                                />

                                {errorDistrito && (
                                    <p style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
                                        {errorDistrito}
                                    </p>
                                )}
                            </div>

                            {/* NOMBRE DE SEDE */}
                            <div className="modal-formGroup">
                                <label className="modal-label">Nombre de la sede</label>

                                <input
                                    type="text"
                                    className="modal-input"
                                    placeholder="Ingrese el nombre de la sede"
                                    name="nombreSede"
                                    value={sede.nombreSede}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDownLetras}
                                />

                                {errorNombreSede && (
                                    <p style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
                                        {errorNombreSede}
                                    </p>
                                )}
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
