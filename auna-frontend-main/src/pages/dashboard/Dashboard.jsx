import React from 'react'
import { useState } from 'react';
import './Dashboard.css'

import { Outlet } from "react-router-dom";
import { SidebarAdmin } from '../../components/sidebarAdmin/SidebarAdmin';
import { NavbarHAdmin } from '../../components/navbarHAdmin/NavbarHAdmin';

export const Dashboard = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="dashboard-body app-container">
            <SidebarAdmin collapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
            <div className={`main-content ${isCollapsed ? "" : "mobile-pushed"}`}>
                <NavbarHAdmin toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
                <Outlet />
            </div>
            <div className="sidebarAdmin-overlay" onClick={() => setIsCollapsed(true)} />
        </div>
    );
}
