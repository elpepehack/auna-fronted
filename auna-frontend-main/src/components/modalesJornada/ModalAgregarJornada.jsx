import React, { useState, useEffect } from 'react';
import medicoService from '../../services/medicoService';

const ModalAgregarJornada = ({ show, onClose, onSave }) => {
    const jornadaInicial = {
        medico: {
            idMedico: ''
        },
        diaSemana: ''
    };

    const [jornada, setJornada] = useState(jornadaInicial);
    const [medicos, setMedicos] = useState([]);

    // ERRORES
    const [errorMedico, setErrorMedico] = useState("");
    const [errorDia, setErrorDia] = useState("");

    useEffect(() => {
        medicoService.getAllMedicos()
            .then(response => setMedicos(response.data))
            .catch(error => console.log(error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'medico') {
            setJornada(prev => ({
                ...prev,
                medico: { idMedico: value }
            }));
            setErrorMedico(""); // Limpiar error al seleccionar
        } else {
            setJornada(prev => ({ ...prev, [name]: value }));
            setErrorDia(""); // Limpiar error al seleccionar día
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let valido = true;

        if (!jornada.medico.idMedico) {
            setErrorMedico("Debe seleccionar un médico");
            valido = false;
        }

        if (!jornada.diaSemana) {
            setErrorDia("Debe seleccionar un día de la semana");
            valido = false;
        }

        if (!valido) return;

        onSave(jornada);
        setJornada(jornadaInicial);
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
                            {/* Médico */}
                            <div className="modal-formGroup">
                                <label className="modal-label">Médico</label>
                                <select
                                    className="modal-select"
                                    name="medico"
                                    value={jornada.medico.idMedico}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled hidden>Seleccione un médico</option>
                                    {medicos.map(medico => (
                                        <option key={medico.idMedico} value={medico.idMedico}>
                                            {medico.nombreMedico}
                                        </option>
                                    ))}
                                </select>
                                {errorMedico && (
                                    <p style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
                                        {errorMedico}
                                    </p>
                                )}
                            </div>

                            {/* Día de la semana */}
                            <div className="modal-formGroup">
                                <label className="modal-label">Día de la semana</label>
                                <select
                                    className="modal-select"
                                    name="diaSemana"
                                    value={jornada.diaSemana}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled hidden>Seleccione un día</option>
                                    <option value="LUNES">Lunes</option>
                                    <option value="MARTES">Martes</option>
                                    <option value="MIERCOLES">Miércoles</option>
                                    <option value="JUEVES">Jueves</option>
                                    <option value="VIERNES">Viernes</option>
                                    <option value="SABADO">Sábado</option>
                                    <option value="DOMINGO">Domingo</option>
                                </select>
                                {errorDia && (
                                    <p style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
                                        {errorDia}
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

export default ModalAgregarJornada;
