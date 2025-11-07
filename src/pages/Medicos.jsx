import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { medicos } from "../clinicalApi";

export default function Medicos() {
  const [list, setList] = useState([]);
  useEffect(() => { medicos.list().then(setList).catch(console.error); }, []);
  return (
    <section>
      <h2>Médicos</h2>
      <table>
        <thead><tr><th>Id</th><th>Nombre</th><th>Tarifa</th><th></th></tr></thead>
        <tbody>
          {list.map(m => (
            <tr key={m.id}>
              <td>{m.id}</td><td>{m.nombre}</td><td>{m.tarifa}</td>
              <td><Link to={`/medicos/${m.id}`}>Ver disponibilidad</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
