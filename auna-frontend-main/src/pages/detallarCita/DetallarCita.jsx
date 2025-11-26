import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import sedeService from '../../services/sedeService';
import detalleSedeService from '../../services/detalleSedeService';
import { TablaTurnos } from '../../components/tablaTurnos/TablaTurnos'
import "./DetallarCita.css"

export const DetallarCita = () => {
    const { idSede } = useParams();
    const [sede, setSede] = useState(null);
    const [especialidades, setEspecialidades] = useState([]);
    const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState(null);

    useEffect(() => {
        // Cargar la sede por id
        sedeService.getSedeById(idSede)
            .then(response => setSede(response.data))
            .catch(error => console.error("Error al cargar sede:", error));

        // Cargar todos los detalleSedes y filtrar
        detalleSedeService.getAllDetalleSedes()
            .then(response => {
                const especialidadesFiltradas = response.data
                    .filter(detalle => detalle.sede.idSedes === parseInt(idSede))
                    .map(detalle => detalle.especialidad);

                // Quitar duplicados por idEspecialidad
                const especialidadesUnicas = [];
                const ids = new Set();
                for (let esp of especialidadesFiltradas) {
                    if (!ids.has(esp.idEspecialidad)) {
                        ids.add(esp.idEspecialidad);
                        especialidadesUnicas.push(esp);
                    }
                }

                setEspecialidades(especialidadesUnicas);
            })
            .catch(error => console.error("Error al cargar detalles de sede:", error));
    }, [idSede]);

    return (
        <div className="container mt-5">
            {sede ? (
                <div className="card p-4">
                    <h4>
                        <span style={{ background: '#3949ab', color: 'white', padding: '5px 10px', borderRadius: '5px' }}>
                            {sede.nombreDistrito}
                        </span> &nbsp;
                        {sede.nombreSede}
                    </h4>
                    <hr />
                    <h5>Citas</h5>

                    <p>
                        <span className="badge rounded-circle bg-primary" style={{ width: '30px', height: '30px', lineHeight: '25px' }}>
                            1
                        </span> Seleccione la especialidad para ver los médicos y horarios.
                    </p>

                    <div className="mb-3">
                        <label>Especialidad</label>
                        <select
                            className="form-select"
                            disabled={!!especialidadSeleccionada}
                            onChange={(e) => {
                                const id = parseInt(e.target.value);
                                const esp = especialidades.find(es => es.idEspecialidad === id);
                                setEspecialidadSeleccionada(esp);
                            }}
                        >
                            <option value="">Seleccione especialidad</option>
                            {especialidades.map((especialidad, idx) => (
                                <option key={idx} value={especialidad.idEspecialidad}>
                                    {especialidad.nombreEspecialidad}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <a href={`/reservaCitas/detallaCita/${idSede}`} className="boton-recargar">
                            <i className="fas fa-sync-alt"></i> Elegir de nuevo
                        </a>
                    </div>

                    {especialidadSeleccionada && (
                        <>
                            <p className="mt-4">
                                <span className="badge rounded-circle bg-primary" style={{ width: '30px', height: '30px', lineHeight: '25px' }}>
                                    2
                                </span> Seleccione los horarios disponibles para su cita.
                            </p>
                            <TablaTurnos
                                idSede={parseInt(idSede)}
                                idEspecialidad={especialidadSeleccionada.idEspecialidad}
                            />
                        </>
                    )}
                </div>
            ) : (
                <p>Cargando información de la sede...</p>
            )}
        </div>
    );
}
