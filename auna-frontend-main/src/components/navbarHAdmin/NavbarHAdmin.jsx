import React from 'react'
import './NavbarHAdmin.css'
import LogoHome from '../../images/LogoHome.png'
import { useLocation } from 'react-router-dom';

export const NavbarHAdmin = () => {
    const location = useLocation();

    // Determinar el texto basado en la ruta actual
    const getNavbarText = () => {
        if (location.pathname.includes('moduloUsuarios')) {
            return 'MANTENEDOR DE USUARIOS';
        }
        else if (location.pathname.includes('moduloMedicos')) {
            return 'MANTENEDOR DE MEDICOS';
        }
        else if (location.pathname.includes('moduloEspecialidades')) {
            return 'MANTENEDOR DE ESPECIALIDADES';
        }
        else if (location.pathname.includes('moduloSedes')) {
            return 'MANTENEDOR DE SEDES';
        }
        else if (location.pathname.includes('moduloJornadas')) {
            return 'MANTENEDOR DE HORARIOS DE MEDICO';
        }
        else if (location.pathname.includes('moduloTurnos')) {
            return 'MANTENEDOR DE TURNOS DE ATENCION';
        }
    };

    return (
        <div className="navbarHAdmin-container">
            <div className="navbarHAdmin-logo-section">
                <img
                    src={LogoHome}
                    alt="EsSalud Logo"
                />
            </div>
            <div className="navbarHAdmin-paciente-section">
                <div className="navbarHAdmin-paciente-text">{getNavbarText()}</div>
            </div>
        </div>
    )
}
