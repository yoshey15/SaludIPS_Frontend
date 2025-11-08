// src/clinicalApi.js
import { apiGet, apiSend } from "./api";

// Usa tu API de Azure (sin .env por ahora)
const BASE = "https://doctors-api-cloudac.azurewebsites.net";

export async function listarDoctores() {
  return apiGet(`${BASE}/doctors`);
}

export async function health() {
  return apiGet(`${BASE}/health`);
}

export async function dbHealth() {
  return apiGet(`${BASE}/db/health`);
}

// Ejemplo POST futuro:
// export async function crearDoctor(payload) {
//   return apiSend("POST", `${BASE}/doctors`, payload);
// }
