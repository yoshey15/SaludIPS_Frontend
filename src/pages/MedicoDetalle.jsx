import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { medicos, generarDisponibilidad } from "../clinicalApi";

export default function MedicoDetalle() {
  const { id } = useParams();
  const nav = useNavigate();
  const [doc, setDoc] = useState(null);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    medicos.get(id).then(setDoc).catch(console.error);
    setSlots(generarDisponibilidad());
  }, [id]);

  return (
    <section>
      <h2>Detalle de Médico</h2>
      {doc && <p><b>{doc.nombre}</b>  Tarifa: {doc.tarifa}</p>}
      <h3>Disponibilidad (7 días)</h3>
      <ul>
        {slots.map(s => (
          <li key={s}>
            {s} <button onClick={() => nav("/reserva", { state: { medicoId: id, fechaHora: s } })}>Reservar</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
