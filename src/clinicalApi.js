// src/clinicalApi.js

// URL base de la API de doctores.
// Si más adelante quieres inyectarla por .env, respeta VITE_DOCTORS_API.
// Por ahora dejamos el host de tu Web App funcionando como respaldo.
const API_DOCTORS =
  import.meta?.env?.VITE_DOCTORS_API ||
  "https://doctors-api-cloudac.azurewebsites.net";

/** Lista de doctores desde la API */
export async function medicos() {
  const r = await fetch(`${API_DOCTORS}/doctors`, { headers: { "Accept": "application/json" } });
  if (!r.ok) throw new Error(`Error ${r.status} al cargar doctores`);
  return r.json();
}

/**
 * Genera disponibilidad simple para N días, entre horas [inicio, fin] cada 'intervaloMin' minutos.
 * Devuelve [{ fecha: 'YYYY-MM-DD', horas: ['08:00','08:30', ...] }, ...]
 */
export function generarDisponibilidad({
  dias = 7,
  inicio = "08:00",
  fin = "17:00",
  intervaloMin = 30,
} = {}) {
  const pad = (n) => String(n).padStart(2, "0");

  const [hIni, mIni] = inicio.split(":").map(Number);
  const [hFin, mFin] = fin.split(":").map(Number);

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const out = [];
  for (let d = 0; d < dias; d++) {
    const fecha = new Date(hoy);
    fecha.setDate(hoy.getDate() + d);

    const horas = [];
    const t0 = new Date(fecha);
    t0.setHours(hIni, mIni, 0, 0);

    const t1 = new Date(fecha);
    t1.setHours(hFin, mFin, 0, 0);

    const t = new Date(t0);
    while (t <= t1) {
      horas.push(`${pad(t.getHours())}:${pad(t.getMinutes())}`);
      t.setMinutes(t.getMinutes() + intervaloMin);
    }

    const yyyy = fecha.getFullYear();
    const mm = pad(fecha.getMonth() + 1);
    const dd = pad(fecha.getDate());

    out.push({ fecha: `${yyyy}-${mm}-${dd}`, horas });
  }
  return out;
}
