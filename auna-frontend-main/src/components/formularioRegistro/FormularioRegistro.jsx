import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UsuarioService from "../../services/usuarioService";

const FormularioRegistro = () => {
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    tipoDocumento: "",
    numDocumento: "",
    correoElectronico: "",
    numeroCelular: "",
    contrasena: "",
    terminos: false,
  });
  const [errores, setErrores] = useState({});
  const [mostrarErrores, setMostrarErrores] = useState(false);

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setFormulario({
      ...formulario,
      [name]: type === "checkbox" ? checked : value,
    });
    if (mostrarErrores) {
      setErrores({
        ...errores,
        [name]: validarCampo(name, type === "checkbox" ? checked : value),
      });
    }
  };

  const validarCampo = (nombre, valor) => {
    switch (nombre) {
      case "nombre":
      case "apellido":
        return !valor ? "Obligatorio" : "";
      case "tipoDocumento":
        return !valor ? "Selecciona tipo" : "";
      case "numDocumento":
        return !/^\d{8,12}$/.test(valor) ? "8-12 dígitos" : "";
      case "correoElectronico":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)
          ? "Correo inválido"
          : "";
      case "numeroCelular":
        return !/^\d{9}$/.test(valor) ? "9 dígitos" : "";
      case "contrasena":
        return !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(valor)
          ? "8c, 1M, 1m, 1d"
          : "";
      case "terminos":
        return !valor ? "Requerido" : "";
      default:
        return "";
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    Object.keys(formulario).forEach(
      (k) => (nuevosErrores[k] = validarCampo(k, formulario[k]))
    );
    setErrores(nuevosErrores);
    setMostrarErrores(true);
    return !Object.values(nuevosErrores).some((err) => err);
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      const usuario = { ...formulario, tipoUsuario: "PACIENTE" };
      UsuarioService.createUsuarios(usuario)
        .then(() => {
          alert("¡Registro exitoso!");
          navigate("/ingresar");
        })
        .catch(() => alert("Error al registrarte."));
    }
  };

  return (
    <form onSubmit={manejarEnvio} noValidate className="small-form">
      <div className="row g-2 mb-2">
        <div className="col">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            className={`form-control-registro form-control-sm ${errores.nombre && mostrarErrores ? "is-invalid" : ""
              }`}
            value={formulario.nombre}
            onChange={manejarCambio}
          />
          {errores.nombre && mostrarErrores && (
            <div className="invalid-feedback">{errores.nombre}</div>
          )}
        </div>
        <div className="col">
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            className={`form-control-registro form-control-sm ${errores.apellido && mostrarErrores ? "is-invalid" : ""
              }`}
            value={formulario.apellido}
            onChange={manejarCambio}
          />
          {errores.apellido && mostrarErrores && (
            <div className="invalid-feedback">{errores.apellido}</div>
          )}
        </div>
      </div>

      <div className="row g-2 mb-2">
        <div className="col-4">
          <select
            name="tipoDocumento"
            className={`form-select form-select-sm ${errores.tipoDocumento && mostrarErrores ? "is-invalid" : ""
              }`}
            value={formulario.tipoDocumento}
            onChange={manejarCambio}
          >
            <option value="">Tipo</option>
            <option value="DNI">DNI</option>
            <option value="CE">CE</option>
          </select>
          {errores.tipoDocumento && mostrarErrores && (
            <div className="invalid-feedback">{errores.tipoDocumento}</div>
          )}
        </div>
        <div className="col">
          <input
            type="text"
            name="numDocumento"
            placeholder="Nro Documento"
            className={`form-control-registro form-control-sm ${errores.numDocumento && mostrarErrores ? "is-invalid" : ""
              }`}
            value={formulario.numDocumento}
            onChange={manejarCambio}
          />
          {errores.numDocumento && mostrarErrores && (
            <div className="invalid-feedback">{errores.numDocumento}</div>
          )}
        </div>
      </div>

      <div className="mb-2">
        <input
          type="email"
          name="correoElectronico"
          placeholder="Correo electrónico"
          className={`form-control-registro form-control-sm ${errores.correoElectronico && mostrarErrores ? "is-invalid" : ""
            }`}
          value={formulario.correoElectronico}
          onChange={manejarCambio}
        />
        {errores.correoElectronico && mostrarErrores && (
          <div className="invalid-feedback">{errores.correoElectronico}</div>
        )}
      </div>

      <div className="mb-2">
        <input
          type="tel"
          name="numeroCelular"
          placeholder="Teléfono"
          className={`form-control-registro form-control-sm ${errores.numeroCelular && mostrarErrores ? "is-invalid" : ""
            }`}
          value={formulario.numeroCelular}
          onChange={manejarCambio}
        />
        {errores.numeroCelular && mostrarErrores && (
          <div className="invalid-feedback">{errores.numeroCelular}</div>
        )}
      </div>

      <div className="mb-2">
        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          className={`form-control-registro form-control-sm ${errores.contrasena && mostrarErrores ? "is-invalid" : ""
            }`}
          value={formulario.contrasena}
          onChange={manejarCambio}
        />
        {errores.contrasena && mostrarErrores && (
          <div className="invalid-feedback">{errores.contrasena}</div>
        )}
      </div>

      <div className="form-check mb-3 text-start">
        <input
          className={`form-check-input ${errores.terminos && mostrarErrores ? "is-invalid" : ""}`}
          type="checkbox"
          name="terminos"
          checked={formulario.terminos}
          onChange={manejarCambio}
          id="terminos"
        />
        <label className="form-check-label ms-2" htmlFor="terminos">
          Acepto los <a href="/registrar">Términos y Condiciones</a> y <a href="/registrar">Política de Privacidad</a>
        </label>
        {errores.terminos && mostrarErrores && (
          <div className="invalid-feedback d-block">{errores.terminos}</div>
        )}
      </div>


      <button type="submit" className="btn btn-submit btn-sm w-100">
        REGISTRARSE
      </button>
    </form>
  );
};

export default FormularioRegistro;
