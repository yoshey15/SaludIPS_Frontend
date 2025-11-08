// src/clinicalApi.js

// Base de la API de doctores.
// Puedes sobreescribir con VITE_DOCTORS_API en .env si lo necesitas.
const API =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_DOCTORS_API) ||
  "https://doctors-api-cloudac.azurewebsites.net";

async function getJSON(path) {
  const res = await fetch(`${API}${path}`, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText} -> ${path}`);
  return res.json();
}

// === Endpoints reales de la API ===
export const listarDoctores = () => getJSON("/doctors");
export const health        = () => getJSON("/health");
export const dbHealth      = () => getJSON("/db/health");

// === Utilidad para slots de agenda (usada en MedicoDetalle) ===
export function generarDisponibilidad({
  dias = 7,
  inicio = "08:00",
  fin = "17:00",
  intervaloMin = 30,
} = {}) {
  const pad = (n) => String(n).padStart(2, "0");
  const [hIni, mIni] = inicio.split(":").map(Number);
  const [hFin, mFin] = fin.split(":").map(Number);

  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  const out = [];

  for (let d = 0; d < dias; d++) {
    const fecha = new Date(hoy); fecha.setDate(hoy.getDate() + d);

    const horas = [];
    const t0 = new Date(fecha); t0.setHours(hIni, mIni, 0, 0);
    const t1 = new Date(fecha); t1.setHours(hFin, mFin, 0, 0);

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

// === Alias por compatibilidad con código anterior ===
export const medicos = listarDoctores;

