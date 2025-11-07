import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="wrap">
      <h1>Turnos Clínicos  MVP</h1>
      <nav className="nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/usuarios">Usuarios</NavLink>
        <NavLink to="/medicos">Médicos</NavLink>
        <NavLink to="/reserva">Reservar cita</NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
