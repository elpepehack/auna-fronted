import React from 'react'

const ModalConfirmacion = ({ mensaje, onConfirm, onCancel }) => {
    return (
        <>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirmar acción</h5>
                        </div>
                        <div className="modal-body">
                            <p>{mensaje}</p>
                            <p className="text-danger"><b><small>Esta operación no se puede deshacer.</small></b></p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
                            <button className="btn btn-danger" onClick={onConfirm}>Confirmar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    );
};

export default ModalConfirmacion;
