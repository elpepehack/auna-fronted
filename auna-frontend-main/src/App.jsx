import './App.css'
import { Routes, Route } from "react-router-dom";
import { Autenticacion } from "./pages/autenticacion/Autenticacion";
import { Paginaerror } from "./pages/paginaerror/Paginaerror";
import { Home } from "./pages/home/Home";
import { Ingresar } from "./pages/ingresar/Ingresar";
import { Registrar } from "./pages/registrar/Registrar";
import { HomeCitas } from "./pages/homeCitas/HomeCitas";
import { HomeHistorial } from "./pages/homeHistorial/HomeHistorial";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { DashboardUsuarios } from "./pages/dashboardUsuarios/DashboardUsuarios";
import { DashboardMedicos } from "./pages/dashboardMedicos/DashboardMedicos";
import { DashboardEspecialidades } from "./pages/dashboardEspecialidades/DashboardEspecialidades";
import { DashboardSedes } from "./pages/dashboardSedes/DashboardSedes";
import { DashboardJornada } from "./pages/dashboardJornada/DashboardJornada";
import { DashboardTurnosAtencion } from "./pages/dashboardTurnosAtencion/DashboardTurnosAtencion";
import { DetallarCita } from "./pages/detallarCita/DetallarCita";
import { ResumenCita } from "./pages/resumenCita/ResumenCita";
import { ProtectedRoute } from "./components/protectedRoute/ProtectedRoute";
import { PaginaNoAutorizado } from "./pages/paginaNoAutorizado/PaginaNoAutorizado"
import DashboardCitas from "./pages/dashboardCitas/DashboardCitas";
import { PagoExitoso } from './pages/pagoVistas/PagoExitoso';
import { PagoFallido } from './pages/pagoVistas/PagoFallido';
import { PagoPendiente } from './pages/pagoVistas/PagoPendiente';

function App() {
  return (
    <div className="App">
      <Routes>

        {/* RUTAS PACIENTES */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["PACIENTE"]}>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <ProtectedRoute allowedRoles={["PACIENTE"]}>
                <HomeCitas />
              </ProtectedRoute>
            }
          />
          <Route
            path="reservaCitas"
            element={
              <ProtectedRoute allowedRoles={["PACIENTE"]}>
                <HomeCitas />
              </ProtectedRoute>
            }
          />
          <Route
            path="reservaCitas/detallaCita/:idSede"
            element={
              <ProtectedRoute allowedRoles={["PACIENTE"]}>
                <DetallarCita />
              </ProtectedRoute>
            }
          />
          <Route
            path="reservaCitas/resumen-cita"
            element={
              <ProtectedRoute allowedRoles={["PACIENTE"]}>
                <ResumenCita />
              </ProtectedRoute>
            }
          />
          <Route
            path="historialCitas"
            element={
              <ProtectedRoute allowedRoles={["PACIENTE"]}>
                <HomeHistorial />
              </ProtectedRoute>
            }
          />
          <Route
            path="pago-exitoso"
            element={
              <ProtectedRoute allowedRoles={["PACIENTE"]}>
                <PagoExitoso />
              </ProtectedRoute>
            }
          />
          <Route
            path="pago-pendiente"
            element={
              <ProtectedRoute allowedRoles={["PACIENTE"]}>
                <PagoPendiente />
              </ProtectedRoute>
            }
          />
          <Route
            path="pago-fallido"
            element={
              <ProtectedRoute allowedRoles={["PACIENTE"]}>
                <PagoFallido />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* RUTAS ADMIN */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMINISTRADOR"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <ProtectedRoute allowedRoles={["ADMINISTRADOR"]}>
                <DashboardUsuarios />
              </ProtectedRoute>
            }
          />
          <Route
            path="moduloUsuarios"
            element={
              <ProtectedRoute allowedRoles={["ADMINISTRADOR"]}>
                <DashboardUsuarios />
              </ProtectedRoute>
            }
          />
          <Route
            path="moduloMedicos"
            element={
              <ProtectedRoute allowedRoles={["ADMINISTRADOR"]}>
                <DashboardMedicos />
              </ProtectedRoute>
            }
          />
          <Route
            path="moduloEspecialidades"
            element={
              <ProtectedRoute allowedRoles={["ADMINISTRADOR"]}>
                <DashboardEspecialidades />
              </ProtectedRoute>
            }
          />
          <Route
            path="moduloSedes"
            element={
              <ProtectedRoute allowedRoles={["ADMINISTRADOR"]}>
                <DashboardSedes />
              </ProtectedRoute>
            }
          />
          <Route
            path="moduloJornadas"
            element={
              <ProtectedRoute allowedRoles={["ADMINISTRADOR"]}>
                <DashboardJornada />
              </ProtectedRoute>
            }
          />
          <Route
            path="moduloTurnos"
            element={
              <ProtectedRoute allowedRoles={["ADMINISTRADOR"]}>
                <DashboardTurnosAtencion />
              </ProtectedRoute>
            }
          />
          <Route
            path="moduloCitas"
            element={
              <ProtectedRoute allowedRoles={["ADMINISTRADOR"]}>
                <DashboardCitas />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* PÁGINAS PÚBLICAS */}
        <Route path="/autenticacion" element={<Autenticacion />} />
        <Route path="/ingresar" element={<Ingresar />} />
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/no-autorizado" element={<PaginaNoAutorizado />} />
        <Route path="*" element={<Paginaerror />} />
      </Routes>
    </div>
  );
}

export default App
