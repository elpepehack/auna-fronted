import React from 'react';
import ImagenAbrazo from '../../images/AbrazoESSALUD.png'

const PanelIzquierdo = () => {
  return (
    <div className="left-panel">
      <h1>Auna</h1>
      <h2>Bienvenido a tu espacio de salud digital</h2>
      <p>En Auna, tu bienestar es nuestra prioridad. Hoy das un paso
        importante hacia el cuidado de tu salud, fácil, rápido y desde donde
        estés.</p>
      <p className="highlight-text">Estamos contigo en cada etapa, porque cuidarte es lo más importante.</p>
      <img src={ImagenAbrazo} alt="Abrazo EsSalud" class="img-abrzo" loading="lazy" />
    </div>
  );
};

// Al final del archivo debe tener:
export default PanelIzquierdo;