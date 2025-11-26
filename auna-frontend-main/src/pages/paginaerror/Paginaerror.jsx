import React from 'react';

export const Paginaerror = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        <i className="bi bi-exclamation-triangle-fill text-warning" style={{ fontSize: "5rem" }}></i>
        <h1 className="mt-4">¡Oops!</h1>
        <p className="lead">La página que buscas no existe o ha sido movida.</p>
        <a href="/" className="btn btn-primary mt-3">
          <i className="bi bi-arrow-left-circle me-2"></i> Volver al inicio
        </a>
      </div>
    </div>
  );
};
