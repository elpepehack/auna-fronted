import React from "react";
import FormularioRegistro from "../formularioRegistro/FormularioRegistro";
import PantallaExito from "../pantallaExito/PantallaExito";
import { Link } from "react-router-dom";

const PanelDerecho = () => {
  const [registroExitoso, setRegistroExitoso] = React.useState(false);

  const manejarExitoRegistro = () => {
    setRegistroExitoso(true);
  };

  return (
    <div className="right-panel">
      {!registroExitoso ? (
        <>
          <h2 className="form-title">Regístrate</h2>
          <FormularioRegistro onRegistroExitoso={manejarExitoRegistro} />
          <p className="text-center mt-3">
            ¿Ya tienes una cuenta? <Link to="/ingresar">Inicia sesión</Link>
          </p>
        </>
      ) : (
        <PantallaExito />
      )}
    </div>
  );
};

// Al final del archivo debe tener:
export default PanelDerecho;
