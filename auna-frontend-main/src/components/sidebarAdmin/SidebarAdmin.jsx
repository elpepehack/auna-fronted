import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import './SidebarAdmin.css'

export const SidebarAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();

    // Recuperar usuario
    const usuario = JSON.parse(localStorage.getItem("usuario"));

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
        setCollapsed(isMobile);
    }, [isMobile]);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const handleLogout = () => {
        localStorage.removeItem("usuario");
        navigate("/ingresar");
    };

    return (
        <>
            <div className={`sidebarAdmin d-flex flex-column ${collapsed ? "collapsed" : ""}`} id="sidebar">
                <div className="sidebarAdmin-header">
                    <span className="sidebarAdmin-text">
                        ADMINISTRADOR: {usuario.nombre} {usuario.apellido}
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
                        to="/dashboard/moduloUsuarios"
                        className={({ isActive }) =>
                            `nav-link d-flex align-items-center ${isActive ? "active" : ""}`
                        }
                        onClick={() => isMobile && setCollapsed(true)}
                    >
                        <i className="bi bi-people-fill me-2"></i>
                        <span className="sidebarAdmin-text">Usuarios</span>
                    </NavLink>
                    <NavLink
                        to="/dashboard/moduloMedicos"
                        className={({ isActive }) =>
                            `nav-link d-flex align-items-center ${isActive ? "active" : ""}`
                        }
                        onClick={() => isMobile && setCollapsed(true)}
                    >
                        <i className="bi bi-person-badge-fill me-2"></i>
                        <span className="sidebarAdmin-text">Médicos</span>
                    </NavLink>
                    <NavLink
                        to="/dashboard/moduloEspecialidades"
                        className={({ isActive }) =>
                            `nav-link d-flex align-items-center ${isActive ? "active" : ""}`
                        }
                        onClick={() => isMobile && setCollapsed(true)}
                    >
                        <i className="bi bi-award-fill me-2"></i>
                        <span className="sidebarAdmin-text">Especialidades</span>
                    </NavLink>
                    <NavLink
                        to="/dashboard/moduloSedes"
                        className={({ isActive }) =>
                            `nav-link d-flex align-items-center ${isActive ? "active" : ""}`
                        }
                        onClick={() => isMobile && setCollapsed(true)}
                    >
                        <i className="bi bi-building me-2"></i>
                        <span className="sidebarAdmin-text">Sedes</span>
                    </NavLink>
                    <NavLink
                        to="/dashboard/moduloJornadas"
                        className={({ isActive }) =>
                            `nav-link d-flex align-items-center ${isActive ? "active" : ""}`
                        }
                        onClick={() => isMobile && setCollapsed(true)}
                    >
                        <i className="bi bi-calendar-week-fill me-2"></i>
                        <span className="sidebarAdmin-text">Horarios Médicos</span>
                    </NavLink>
                    <NavLink
                        to="/dashboard/moduloTurnos"
                        className={({ isActive }) =>
                            `nav-link d-flex align-items-center ${isActive ? "active" : ""}`
                        }
                        onClick={() => isMobile && setCollapsed(true)}
                    >
                        <i className="bi bi-clock-fill me-2"></i>
                        <span className="sidebarAdmin-text">Turnos Atención</span>
                    </NavLink>
                </nav>

                <div className="logout mt-auto p-3 border-top border-secondary">
                    <button
                        className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center"
                        onClick={handleLogout}
                    >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        <span className="sidebarAdmin-text">Cerrar sesión</span>
                    </button>
                </div>
            </div>

            {!collapsed && isMobile && (
                <div
                    className="sidebarAdmin-overlay"
                    onClick={toggleSidebar}
                />
            )}
        </>
    );
}
