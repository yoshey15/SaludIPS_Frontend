import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { citas } from "../clinicalApi";

export default function Reserva() {
  const loc = useLocation();
  const preset = loc.state || {};
  const [medicoId, setMedicoId] = useState(preset.medicoId || "");
  const [pacienteNombre, setPacienteNombre] = useState("");
  const [fechaHora, setFechaHora] = useState(preset.fechaHora || "");
  const [resultado, setResultado] = useState(null);

  async function reservar() {
    if (!medicoId || !pacienteNombre || !fechaHora) return alert("Completa todos los campos");
    const r = await citas.crear({ medicoId, pacienteNombre, fechaHora });
    setResultado(r);
  }

  return (
    <section>
      <h2>Reservar Cita</h2>
      <div className="row">
        <input placeholder="Id Médico" value={medicoId} onChange={e=>setMedicoId(e.target.value)} />
        <input placeholder="Nombre Paciente" value={pacienteNombre} onChange={e=>setPacienteNombre(e.target.value)} />
        <input placeholder="Fecha Hora (YYYY-MM-DD HH:mm)" value={fechaHora} onChange={e=>setFechaHora(e.target.value)} />
        <button onClick={reservar}>Confirmar</button>
      </div>
      {resultado && <pre className="pre">{JSON.stringify(resultado, null, 2)}</pre>}
    </section>
  );
}
