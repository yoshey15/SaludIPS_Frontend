// src/pages/Medicos.jsx
import React, { useEffect, useState } from "react";
import { listarDoctores, health, dbHealth } from "../clinicalApi";

export default function Medicos() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState({ api: "?", db: "?" });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [h, d, docs] = await Promise.all([
          health().catch(() => ({ status: "down" })),
          dbHealth().catch(() => ({ ok: false })),
          listarDoctores(),
        ]);
        setStatus({
          api: h?.status || "down",
          db: d?.ok ? "ok" : "down",
        });
        setItems(Array.isArray(docs) ? docs : []);
      } catch (e) {
        setErr(e?.message || "Error cargando médicos");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Cargando médicos…</p>;
  if (err) return <p style={{ color: "tomato" }}>{err}</p>;

  return (
    <div className="container">
      <h2>Médicos</h2>
      <p style={{ fontSize: 12 }}>
        Salud API: <b>{status.api}</b> · DB: <b>{status.db}</b>
      </p>

      {items.length === 0 ? (
        <p>No hay médicos.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Especialidad</th>
            </tr>
          </thead>
          <tbody>
            {items.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.nombre}</td>
                <td>{m.especialidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
