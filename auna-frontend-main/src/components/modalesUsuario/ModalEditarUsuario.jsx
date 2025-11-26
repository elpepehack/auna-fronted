import './ModalEditarUsuario.css';
import React, { useState, useEffect } from 'react';

export const ModalEditarUsuario = ({ show, onClose, onUpdate, usuarioActual }) => {
  const [usuario, setUsuario] = useState(usuarioActual);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    setUsuario(usuarioActual);
  }, [usuarioActual]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let nuevoValor = value;

    // Limitar numDocumento según tipo
    if (name === "numDocumento") {
      if (usuario.tipoDocumento === "DNI") nuevoValor = value.replace(/\D/g, '').slice(0, 8);
      if (usuario.tipoDocumento === "CE") nuevoValor = value.replace(/\D/g, '').slice(0, 12);
    }

    // Limitar numeroCelular a 9 dígitos
    if (name === "numeroCelular") {
      nuevoValor = value.replace(/\D/g, '').slice(0, 9);
    }

    // Solo letras y espacios para nombre y apellido
    if (name === "nombre" || name === "apellido") {
      nuevoValor = value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, '');
    }

    setUsuario(prev => ({ ...prev, [name]: nuevoValor }));
  };

  const validarCampos = () => {
    const erroresLocal = {};

    // numDocumento
    if (!usuario.numDocumento) {
      erroresLocal.numDocumento = "Obligatorio";
    } else if (usuario.tipoDocumento === "DNI" && usuario.numDocumento.length !== 8) {
      erroresLocal.numDocumento = "DNI debe tener exactamente 8 dígitos";
    } else if (usuario.tipoDocumento === "CE" && usuario.numDocumento.length !== 12) {
      erroresLocal.numDocumento = "CE debe tener exactamente 12 dígitos";
    }

    // numeroCelular
    if (!usuario.numeroCelular) {
      erroresLocal.numeroCelular = "Obligatorio";
    } else if (usuario.numeroCelular.length !== 9) {
      erroresLocal.numeroCelular = "Teléfono debe tener exactamente 9 dígitos";
    }

    // nombre y apellido
    if (!usuario.nombre) {
      erroresLocal.nombre = "Obligatorio";
    }

    if (!usuario.apellido) {
      erroresLocal.apellido = "Obligatorio";
    }

    return erroresLocal;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidacion = validarCampos();
    setErrores(erroresValidacion);

    if (Object.keys(erroresValidacion).length === 0) {
      onUpdate(usuario.idUsuario, usuario);
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Usuario</h5>
            <button type="button" className="modal-closeBtn" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="modal-row">
                <div className="modal-col">
                  <div className="modal-formGroup">
                    <label className="modal-label">Tipo de documento</label>
                    <select
                      className="modal-select"
                      name="tipoDocumento"
                      value={usuario.tipoDocumento}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled hidden>Seleccione su documento</option>
                      <option value="DNI">DNI</option>
                      <option value="CE">CE</option>
                    </select>
                  </div>
                </div>
                <div className="modal-col">
                  <div className="modal-formGroup">
                    <label className="modal-label">Número de documento</label>
                    <input
                      type="text"
                      className={`modal-input ${errores.numDocumento ? "is-invalid" : ""}`}
                      placeholder="Ingrese número de documento"
                      name="numDocumento"
                      value={usuario.numDocumento}
                      onChange={handleChange}
                      required
                    />
                    {errores.numDocumento && (
                      <div className="invalid-feedback">{errores.numDocumento}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="modal-row">
                <div className="modal-col">
                  <div className="modal-formGroup">
                    <label className="modal-label">Nombre</label>
                    <input
                      type="text"
                      className={`modal-input ${errores.nombre ? "is-invalid" : ""}`}
                      placeholder="Ingrese nombre del usuario"
                      name="nombre"
                      value={usuario.nombre}
                      onChange={handleChange}
                      required
                    />
                    {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                  </div>
                </div>
                <div className="modal-col">
                  <div className="modal-formGroup">
                    <label className="modal-label">Apellido</label>
                    <input
                      type="text"
                      className={`modal-input ${errores.apellido ? "is-invalid" : ""}`}
                      placeholder="Ingrese apellido del usuario"
                      name="apellido"
                      value={usuario.apellido}
                      onChange={handleChange}
                      required
                    />
                    {errores.apellido && <div className="invalid-feedback">{errores.apellido}</div>}
                  </div>
                </div>
              </div>

              <div className="modal-row">
                <div className="modal-col">
                  <div className="modal-formGroup">
                    <label className="modal-label">Teléfono</label>
                    <input
                      type="tel"
                      className={`modal-input ${errores.numeroCelular ? "is-invalid" : ""}`}
                      placeholder="999999999"
                      name="numeroCelular"
                      value={usuario.numeroCelular}
                      onChange={handleChange}
                      required
                    />
                    {errores.numeroCelular && (
                      <div className="invalid-feedback">{errores.numeroCelular}</div>
                    )}
                  </div>
                </div>
                <div className="modal-col">
                  <div className="modal-formGroup">
                    <label className="modal-label">Correo</label>
                    <input
                      type="email"
                      className="modal-input"
                      placeholder="Ingrese correo del usuario"
                      name="correoElectronico"
                      value={usuario.correoElectronico}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="modal-row">
                <div className="modal-col">
                  <div className="modal-formGroup">
                    <label className="modal-label">Tipo de usuario</label>
                    <select
                      className="modal-select opacity-75 text-muted"
                      name="tipoUsuario"
                      value={usuario.tipoUsuario}
                      onChange={handleChange}
                      required
                      disabled
                    >
                      <option value="PACIENTE">PACIENTE</option>
                      <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                    </select>
                  </div>
                </div>
                <div className="modal-col">
                  <div className="modal-formGroup">
                    <label className="modal-label">Contraseña</label>
                    <input
                      type="password"
                      className="modal-input"
                      placeholder="Ingrese su contraseña"
                      name="contrasena"
                      value={usuario.contrasena}
                      onChange={handleChange}
                      pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}"
                      title="Mínimo 8 caracteres, 1 mayúscula, 1 minúscula y 1 número"
                      required
                    />
                  </div>
                </div>
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

export default ModalEditarUsuario;
