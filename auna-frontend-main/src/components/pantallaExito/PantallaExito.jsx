import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PantallaExito = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/Ingresar');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-screen">
      <div className="success-icon"><span>✓</span></div>
      <h2 className="success-message">¡Registro exitoso!</h2>
      <p className="redirect-message">Serás redirigido automáticamente...</p>
    </div>
  );
};

// Al final del archivo debe tener:
export default PantallaExito;