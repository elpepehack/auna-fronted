import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import medicoService from '../../services/medicoService';
import detalleSedeService from '../../services/detalleSedeService';
import jornadaMedicoService from '../../services/jornadaMedicoService';

const ModalAgregarTurno = ({ show, onClose, onSave }) => {
    const turnoInicial = {
        medico: { idMedico: '' },
        detalleSede: { idDetalleSede: '' },
        fecha: null,
        horaInicio: '',
        horaFin: '',
        numCupos: ''
    };

    const [turno, setTurno] = useState(turnoInicial);
    const [medicos, setMedicos] = useState([]);
    const [detallesSede, setDetallesSede] = useState([]);
    const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState('');
    const [jornadasMedico, setJornadasMedico] = useState([]);
    const [diasPermitidos, setDiasPermitidos] = useState([]);

    // ERRORES
    const [errorDetalleSede, setErrorDetalleSede] = useState("");
    const [errorMedico, setErrorMedico] = useState("");
    const [errorFecha, setErrorFecha] = useState("");
    const [errorHoraInicio, setErrorHoraInicio] = useState("");
    const [errorHoraFin, setErrorHoraFin] = useState("");
    const [errorCupos, setErrorCupos] = useState("");

    useEffect(() => {
        medicoService.getAllMedicos()
            .then(response => setMedicos(response.data))
            .catch(error => console.log(error));
        detalleSedeService.getAllDetalleSedes()
            .then(response => setDetallesSede(response.data))
            .catch(error => console.log(error));
        jornadaMedicoService.getAllJornadaMedicos()
            .then(response => setJornadasMedico(response.data))
            .catch(error => console.log(error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'medico') {
            setTurno(prev => ({
                ...prev,
                medico: { idMedico: value },
                fecha: null
            }));
            setErrorMedico(""); // limpiar error
            if (value) {
                const jornadasFiltradas = jornadasMedico.filter(j => j.medico.idMedico === parseInt(value));
                const dias = jornadasFiltradas.map(j => j.diaSemana);
                const diasNumeros = dias.map(d => {
                    switch (d) {
                        case 'LUNES': return 1;
                        case 'MARTES': return 2;
                        case 'MIERCOLES': return 3;
                        case 'JUEVES': return 4;
                        case 'VIERNES': return 5;
                        case 'SABADO': return 6;
                        case 'DOMINGO': return 0;
                        default: return -1;
                    }
                });
                setDiasPermitidos(diasNumeros);
            } else {
                setDiasPermitidos([]);
            }
        }
        else if (name === 'idDetalleSede') {
            const detalleSeleccionado = detallesSede.find(d => d.idDetalleSede === parseInt(value));
            setEspecialidadSeleccionada(detalleSeleccionado?.especialidad?.idEspecialidad || '');
            setTurno(prev => ({
                ...prev,
                detalleSede: { idDetalleSede: value },
                medico: { idMedico: '' },
                fecha: null
            }));
            setDiasPermitidos([]);
            setErrorDetalleSede(""); // limpiar error
        } else {
            setTurno(prev => ({ ...prev, [name]: value }));
            if (name === "horaInicio") setErrorHoraInicio("");
            if (name === "horaFin") setErrorHoraFin("");
            if (name === "numCupos") setErrorCupos("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let valido = true;

        if (!turno.detalleSede.idDetalleSede) {
            setErrorDetalleSede("Debe seleccionar un detalle de sede");
            valido = false;
        }

        if (!turno.medico.idMedico) {
            setErrorMedico("Debe seleccionar un médico");
            valido = false;
        }

        if (!turno.fecha) {
            setErrorFecha("Debe seleccionar una fecha");
            valido = false;
        }

        if (!turno.horaInicio) {
            setErrorHoraInicio("Debe ingresar hora de inicio");
            valido = false;
        }

        if (!turno.horaFin) {
            setErrorHoraFin("Debe ingresar hora de fin");
            valido = false;
        }

        if (!turno.numCupos || turno.numCupos <= 0) {
            setErrorCupos("Debe ingresar un número válido de cupos");
            valido = false;
        }

        if (turno.horaInicio && turno.horaFin && turno.numCupos > 0) {
            const [hInicio, mInicio] = turno.horaInicio.split(':').map(Number);
            const [hFin, mFin] = turno.horaFin.split(':').map(Number);
            const duracionHoras = (hFin + mFin / 60) - (hInicio + mInicio / 60);
            if (duracionHoras < turno.numCupos) {
                setErrorCupos(`No puede asignar ${turno.numCupos} cupos en ${duracionHoras.toFixed(1)} horas. Cada cita ocupa 1 hora.`);
                valido = false;
            }
        }

        if (!valido) return;

        const turnoParaEnviar = {
            ...turno,
            fecha: turno.fecha ? turno.fecha.toISOString().split('T')[0] : ''
        };

        onSave(turnoParaEnviar);
        setTurno(turnoInicial);
        setEspecialidadSeleccionada('');
        setDiasPermitidos([]);
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Registrar Turno de Atención</h5>
                        <button type="button" className="modal-closeBtn" onClick={onClose}></button>
                    </div>

                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="modal-row">
                                <div className="modal-col">
                                    <div className="modal-formGroup">
                                        <label className="modal-label">Detalle de Sede</label>
                                        <select
                                            className="modal-select"
                                            name="idDetalleSede"
                                            value={turno.detalleSede.idDetalleSede}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled hidden>Seleccione detalle de sede</option>
                                            {detallesSede.map(det => (
                                                <option key={det.idDetalleSede} value={det.idDetalleSede}>
                                                    {`${det.sede.nombreSede} - ${det.especialidad.nombreEspecialidad}`}
                                                </option>
                                            ))}
                                        </select>
                                        {errorDetalleSede && (
                                            <p style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
                                                {errorDetalleSede}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="modal-col">
                                    <div className="modal-formGroup">
                                        <label className="modal-label">Médico</label>
                                        <select
                                            className="modal-select"
                                            name="medico"
                                            value={turno.medico.idMedico}
                                            onChange={handleChange}
                                            disabled={!especialidadSeleccionada}
                                        >
                                            <option value="" disabled hidden>Seleccione un médico</option>
                                            {medicos
                                                .filter(m => m.especialidad?.idEspecialidad === parseInt(especialidadSeleccionada))
                                                .map(medico => (
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
                                </div>
                            </div>

                            <div className="modal-row">
                                <div className="modal-col">
                                    <div className="modal-formGroup">
                                        <label className="modal-label">Fecha</label>
                                        <DatePicker
                                            selected={turno.fecha}
                                            onChange={(date) => { setTurno(prev => ({ ...prev, fecha: date })); setErrorFecha(""); }}
                                            className="modal-input"
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="Seleccione fecha"
                                            minDate={new Date()}
                                            filterDate={(date) => diasPermitidos.includes(date.getDay())}
                                        />
                                        {errorFecha && (
                                            <p style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
                                                {errorFecha}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="modal-col">
                                    <div className="modal-formGroup">
                                        <label className="modal-label">Cupos</label>
                                        <input
                                            type="number"
                                            className="modal-input"
                                            name="numCupos"
                                            value={turno.numCupos}
                                            onChange={handleChange}
                                            min="1"
                                        />
                                        {errorCupos && (
                                            <p style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
                                                {errorCupos}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="modal-row">
                                <div className="modal-col">
                                    <div className="modal-formGroup">
                                        <label className="modal-label">Hora de Inicio</label>
                                        <input
                                            type="time"
                                            className="modal-input"
                                            name="horaInicio"
                                            value={turno.horaInicio}
                                            onChange={handleChange}
                                        />
                                        {errorHoraInicio && (
                                            <p style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
                                                {errorHoraInicio}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="modal-col">
                                    <div className="modal-formGroup">
                                        <label className="modal-label">Hora de Fin</label>
                                        <input
                                            type="time"
                                            className="modal-input"
                                            name="horaFin"
                                            value={turno.horaFin}
                                            onChange={handleChange}
                                        />
                                        {errorHoraFin && (
                                            <p style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
                                                {errorHoraFin}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="modal-btn modal-btnSecondary" onClick={onClose}>
                                    CANCELAR
                                </button>
                                <button type="submit" className="modal-btn modal-btnPrimary">
                                    GUARDAR TURNO
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalAgregarTurno;
