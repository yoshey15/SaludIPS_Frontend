// src/clinicalApi.js
import { apiGet, apiSend } from "./api";

// URL pública de tu API en Azure
const BASE = "https://doctors-api-cloudac.azurewebsites.net";

export const DoctorsAPI = {
  list:   () => apiGet(`${BASE}/doctors`),
  create: (data) => apiSend("POST", `${BASE}/doctors`, data),
  update: (id, data) => apiSend("PUT", `${BASE}/doctors/${id}`, data),
  remove: (id) => apiSend("DELETE", `${BASE}/doctors/${id}`)
};
