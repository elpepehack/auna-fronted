import React from 'react';

const ModalEspecialidades = ({ show, onClose, especialidades, nombreSede }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Especialidades en {nombreSede}</h5>
                        <button className="modal-closeBtn" onClick={onClose}>×</button>
                    </div>
                    <div className="modal-body">
                        {especialidades.length > 0 ? (
                            <ul>
                                {especialidades.map(detalle => (
                                    <li key={detalle.idDetalleSede}>
                                        {detalle.especialidad?.nombreEspecialidad || 'Sin nombre'}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No hay especialidades registradas para esta sede.</p>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button className="modal-btn modal-btnPrimary" onClick={onClose}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalEspecialidades;
