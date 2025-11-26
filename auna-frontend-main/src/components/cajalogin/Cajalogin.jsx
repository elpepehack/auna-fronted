import React, { useState } from "react";
import "./Cajalogin.css";
import abrazoImg from "../../images/AbrazoESSALUD.png";
import { useNavigate } from "react-router-dom";
import logueoService from "../../services/logueoService";

export const Cajalogin = () => {
  const navigate = useNavigate();

  const [numDocumento, setNumDocumento] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginData = {
      username: numDocumento,
      password: password
    };

    logueoService.comprobarLogueo(loginData)
      .then(response => {
        const usuario = response.data;

        localStorage.setItem("usuario", JSON.stringify(usuario));

        if (usuario.tipoUsuario === "ADMINISTRADOR") {
          navigate("/dashboard");
        } else if (usuario.tipoUsuario === "PACIENTE") {
          navigate("/");
        } else {
          alert("Tipo de usuario no reconocido");
        }
      })
      .catch(error => {
        console.error("Error al iniciar sesión:", error);
        alert("Credenciales incorrectas o error en el servidor.");
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-5 col-md-7">
          <div className="login-box">
            <h2>INGRESA</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-4">
                <span className="input-group-text">
                  <i className="fas fa-user"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Número de documento"
                  value={numDocumento}
                  onChange={(e) => setNumDocumento(e.target.value)}
                  required
                />
              </div>

              <div className="input-group mb-4">
                <span className="input-group-text">
                  <i className="fas fa-lock"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit">INGRESAR</button>
              <a href="/ingresar">¿Olvidaste tu contraseña?</a>
            </form>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-10 col-md-8 text-center">
          <img src={abrazoImg} className="family-img" alt="Familia" />
        </div>
      </div>
    </div>
  );
};
