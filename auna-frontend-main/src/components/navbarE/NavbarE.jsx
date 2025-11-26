import React from "react";
import "./NavbarE.css";
import LogoHome from '../../images/LogoHome.png'
import { Link } from "react-router-dom";

export const NavbarE = () => {
  return (
    <div className="container-fluid py-3 px-4 d-flex justify-content-between align-items-center">
      <Link to="/autenticacion" className="text-white text-decoration-none">
        <img src={LogoHome} className="logo-auna" ></img>
      </Link>
      <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-sm-end">
        <a href="/registrar" className="btn btn-outline-light px-3 py-2">
          Regístrate
        </a>
      </div>
    </div>
  );
};
