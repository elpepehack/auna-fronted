import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./SidebarP.css";

// Recibimos las nuevas props para el color de fondo y el tamaño de la fuente
export const SidebarP = ({ setBackgroundColor, currentBackgroundColor, setFontSizeScale, currentFontSizeScale }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();

    // Recuperar usuario (Asegúrate de que 'usuario' existe en localStorage)
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    // Detecta si es móvil al cargar y al cambiar el tamaño de la pantalla
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkIfMobile();
        window.addEventListener("resize", checkIfMobile);

        return () => {
            window.removeEventListener("resize", checkIfMobile);
        };
    }, []);

    useEffect(() => {
        if (isMobile) {
            setCollapsed(true);
        } else {
            setCollapsed(false);
        }
    }, [isMobile]);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const handleLogout = () => {
        localStorage.removeItem("usuario");
        navigate("/ingresar");
    };

    // Función para cambiar el color de fondo (Blanco <-> Negro)
    const toggleBackgroundColor = () => {
        const newColor = currentBackgroundColor === '#ffffff' ? '#000000' : '#ffffff';
        setBackgroundColor(newColor);
    };

    // Función para cambiar el tamaño de la fuente (Normal <-> Grande)
    const toggleFontSize = () => {
        const newScale = currentFontSizeScale === 'normal' ? 'large' : 'normal';
        setFontSizeScale(newScale);
    };

    return (
        <>
            <div
                className={`sidebar d-flex flex-column ${collapsed ? "collapsed" : ""}`}
                id="sidebar"
            >
                <div className="sidebar-header">
                    <span className="sidebar-text">
                        PACIENTE: {usuario?.nombre || 'Paciente'} {usuario?.apellido || 'Paciente'}
                    </span>
                    <button
                        className="btn btn-outline-light px-2 py-1 rounded-2"
                        style={{ width: "36px", height: "36px" }}
                        onClick={toggleSidebar}
                    >
                        <i className="bi bi-list"></i>
                    </button>
                </div>

                <nav className="nav flex-column mt-2">
                    <NavLink
                        to="/reservaCitas"
                        className={({ isActive }) =>
                            `nav-link d-flex align-items-center ${isActive ? "active" : ""}`
                        }
                        onClick={() => isMobile && setCollapsed(true)}
                    >
                        <i className="bi bi-calendar-check me-2"></i>
                        <span className="sidebar-text">Citas</span>
                    </NavLink>
                    <NavLink
                        to="/historialCitas"
                        className={({ isActive }) =>
                            `nav-link d-flex align-items-center ${isActive ? "active" : ""}`
                        }
                        onClick={() => isMobile && setCollapsed(true)}
                    >
                        <i className="bi bi-journal-text me-2"></i>
                        <span className="sidebar-text">Historial</span>
                    </NavLink>
                </nav>

                {/* Botón de Cambio de Fondo */}
                <div className="p-3">
                    <button
                        className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center"
                        onClick={toggleBackgroundColor}
                        title="Cambiar color de fondo"
                    >
                        <i className="bi bi-paint-bucket me-2"></i>
                        <span className="sidebar-text">
                            {currentBackgroundColor === '#ffffff' ? 'Activar modo Oscuro' : 'Activar modo Claro'}
                        </span>
                    </button>
                </div>
                
                {/* Botón para el tamaño de la letra */}
                <div className="px-3 pb-3">
                    <button
                        className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center"
                        onClick={toggleFontSize}
                        title="Cambiar tamaño de fuente"
                    >
                        <i className="bi bi-fonts me-2"></i>
                        <span className="sidebar-text">
                            {currentFontSizeScale === 'normal' ? 'Aumentar Texto' : 'Texto Normal'}
                        </span>
                    </button>
                </div>


                <div className="logout mt-auto p-3 border-top border-secondary">
                    <button
                        className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center"
                        onClick={handleLogout}
                    >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        <span className="sidebar-text">Cerrar sesión</span>
                    </button>
                </div>
            </div>

            {!collapsed && isMobile && (
                <div
                    className="sidebar-overlay"
                    onClick={toggleSidebar}
                />
            )}
        </>
    );
};