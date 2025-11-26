import React from "react";
import PanelIzquierdo from "../panelIzquierdo/PanelIzquierdo";
import PanelDerecho from "../panelDerecho/PanelDerecho";
import "./RegistroEssalud.css";

const RegistroEsSalud = () => {
  return (
    <div className="container-fluid mi-definicion bodyR">
      <div className="row min-vh-100">
        <div className="col-12 col-lg-6">
          <PanelIzquierdo />
        </div>
        <div className="col-12 col-lg-6">
          <PanelDerecho />
        </div>
      </div>
    </div>
  );
};

// Al final del archivo debe tener:
export default RegistroEsSalud;
