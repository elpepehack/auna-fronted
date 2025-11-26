import React, { useState, useEffect } from 'react';
import especialidadService from '../../services/especialidadService';

const ModalAgregarMedico = ({ show, onClose, onSave }) => {
    const medicoInicial = {
        nombreMedico: '',
        especialidad: {
            idEspecialidad: ''
        }
    };

    const [medico, setMedico] = useState(medicoInicial);
    const [especialidades, setEspecialidades] = useState([]);

    const [errorNombre, setErrorNombre] = useState("");
    const [errorEspecialidad, setErrorEspecialidad] = useState("");

    useEffect(() => {
        especialidadService.getAllEspecialidades()
            .then(response => setEspecialidades(response.data))
            .catch(error => console.log("Error cargando especialidades:", error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // BLOQUEAR NÚMEROS: Solo letras
        if (name === "nombreMedico") {
            const soloLetras = value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, "");

            setMedico(prev => ({
                ...prev,
                nombreMedico: soloLetras
            }));

            setErrorNombre("");
            return;
        }

        // Especialidad
        if (name === 'especialidad') {
            setMedico(prev => ({
                ...prev,
                especialidad: { idEspecialidad: value }
            }));
            setErrorEspecialidad("");
        } else {
            setMedico(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let valido = true;

        // Validación nombre
        if (medico.nombreMedico.trim() === "") {
            setErrorNombre("El nombre del médico es obligatorio");
            valido = false;
        }

        // Validación especialidad
        if (medico.especialidad.idEspecialidad === "") {
            setErrorEspecialidad("Debe seleccionar una especialidad");
            valido = false;
        }

        if (!valido) return;

        onSave(medico);
        setMedico(medicoInicial);
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
                            <div className="modal-row">
                                <div className="modal-col">
                                    <div className="modal-formGroup">
                                        <label className="modal-label">Nombre del Médico</label>
                                        <input
                                            type="text"
                                            className="modal-input"
                                            placeholder="Ingrese nombre del médico"
                                            name="nombreMedico"
                                            value={medico.nombreMedico}
                                            onChange={handleChange}
                                        />

                                        {/*  Error nombre */}
                                        {errorNombre && (
                                            <p style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
                                                {errorNombre}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="modal-col">
                                    <div className="modal-formGroup">
                                        <label className="modal-label">Especialidad</label>
                                        <select
                                            className="modal-select"
                                            name="especialidad"
                                            value={medico.especialidad.idEspecialidad}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled hidden>Seleccione una especialidad</option>
                                            {especialidades.map(especialidad => (
                                                <option key={especialidad.idEspecialidad} value={especialidad.idEspecialidad}>
                                                    {especialidad.nombreEspecialidad}
                                                </option>
                                            ))}
                                        </select>

                                        {/* Error especialidad */}
                                        {errorEspecialidad && (
                                            <p style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
                                                {errorEspecialidad}
                                            </p>
                                        )}
                                    </div>
                                </div>
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
                                    GUARDAR MÉDICO
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalAgregarMedico;
 