import React from "react";

export default function Home() {
  return (
    <section>
      <h2>Bienvenido</h2>
      <p>Busca médicos por especialidad, revisa disponibilidad y reserva tu cita.</p>
      <ul>
        <li>Lista de médicos (Products API temporal)</li>
        <li>Disponibilidad simulada (7 días próximos)</li>
        <li>Reserva de cita (POST simulado)</li>
      </ul>
    </section>
  );
}
