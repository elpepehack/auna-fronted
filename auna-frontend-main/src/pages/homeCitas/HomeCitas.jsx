import React, { useEffect, useState } from 'react';
import sedeService from '../../services/sedeService';
import { useNavigate } from 'react-router-dom';
import './HomeCitas.css'

export const HomeCitas = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sedes, setSedes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        sedeService.getAllSedes()
            .then(response => setSedes(response.data))
            .catch(error => console.error("Error al cargar sedes:", error));
    }, []);

    const filteredSedes = sedes.filter(sede =>
        sede.nombreDistrito.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleClickSede = (idSede) => {
        navigate(`/reservaCitas/detallaCita/${idSede}`);
    }

    return (
        <div className="HomeCitas-container py-5">
            <div className="HomeCitas-header">SELECCIONE SU DISTRITO PARA RESERVAR SU CITA</div>

            <input
                type="text"
                className="HomeCitas-search-bar mb-5"
                placeholder="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="row g-4">
                {filteredSedes.map((sede, index) => (
                    <div
                        className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                        key={index}
                        onClick={() => handleClickSede(sede.idSedes)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="HomeCitas-card-custom h-100">
                            <strong>{sede.nombreDistrito}</strong><br />
                            {sede.nombreSede}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

