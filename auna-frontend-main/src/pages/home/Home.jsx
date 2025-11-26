// Home.jsx

import React from "react";
import './Home.css';
import { SidebarP } from "../../components/sidebarP/SidebarP";
import { NavbarH } from "../../components/navbarH/NavbarH";
import { useState } from 'react';
import { Outlet } from "react-router-dom";

export const Home = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState('#ffffff'); 
    // 1. Nuevo estado para el tamaño de la fuente
    const [fontSizeScale, setFontSizeScale] = useState('normal'); 

    // Clase CSS condicional para el modo oscuro (fondo negro)
    const darkTextClass = backgroundColor === '#000000' ? 'dark-mode-text' : '';
    
    // 2. Clase CSS condicional para la fuente grande
    const largeFontClass = fontSizeScale === 'large' ? 'large-font' : '';

    return (
        <div 
            className="home-body app-container" 
            style={{ backgroundColor: backgroundColor }}
        >
            <SidebarP 
                collapsed={isCollapsed} 
                toggleSidebar={() => setIsCollapsed(!isCollapsed)} 
                setBackgroundColor={setBackgroundColor}
                currentBackgroundColor={backgroundColor}
                // 3. Pasar el setter y el estado de la fuente
                setFontSizeScale={setFontSizeScale}
                currentFontSizeScale={fontSizeScale}
            />
            {/* 4. Aplicar AMBAS clases condicionales */}
            <div className={`main-content ${isCollapsed ? "" : "mobile-pushed"} ${darkTextClass} ${largeFontClass}`}>
                <NavbarH toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
                <Outlet />
            </div>
            <div className="sidebar-overlay" onClick={() => setIsCollapsed(true)} />
        </div>
    );
};