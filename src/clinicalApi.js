// src/clinicalApi.js

// Bases de API (puedes sobreescribir con .env si quieres)
const API_DOCTORS =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_DOCTORS_API) ||
  "https://doctors-api-cloudac.azurewebsites.net";

const API_APPTS =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_APPOINTMENTS_API) ||
  null;

// Helpers HTTP
async function getJSON(url) {
  const r = await fetch(url, { headers: { Accept: "application/json" } });
  if (!r.ok) throw new Error(`HTTP ${r.status} ${r.statusText} -> ${url}`);
  return r.json();
}
async function postJSON(url, body) {
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body || {}),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status} ${r.statusText} -> ${url}`);
  try { return await r.json(); } catch { return {}; }
}

// === Endpoints reales de DOCTORS ===
export const listarDoctores = () => getJSON(`${API_DOCTORS}/doctors`);
export const health        = () => getJSON(`${API_DOCTORS}/health`);
export const dbHealth      = () => getJSON(`${API_DOCTORS}/db/health`);
export const medicos       = listarDoctores; // alias de compatibilidad

// === Utilidad para slots de agenda (usada en detalle) ===
export function generarDisponibilidad({
  dias = 7, inicio = "08:00", fin = "17:00", intervaloMin = 30,
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

// === Reserva de citas (lo que usa Reserva.jsx) ===
// Si defines VITE_APPOINTMENTS_API se hace POST real a /appointments.
// Si no, se usa un mock que guarda en localStorage para que el front funcione.
export async function citas(payload) {
  if (API_APPTS) {
    return postJSON(`${API_APPTS}/appointments`, payload);
  }
  const reserva = { id: `res-${Date.now()}`, estado: "ok", ...payload };
  try {
    const all = JSON.parse(localStorage.getItem("reservas") || "[]");
    all.push(reserva);
    localStorage.setItem("reservas", JSON.stringify(all));
  } catch { /* no-op */ }
  return { ok: true, reserva };
}
