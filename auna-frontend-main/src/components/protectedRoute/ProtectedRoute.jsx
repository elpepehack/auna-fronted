import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ allowedRoles, children }) => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
        return <Navigate to="/autenticacion" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(usuario.tipoUsuario)) {
        return <Navigate to="/no-autorizado" replace />;
    }

    return children;
};
