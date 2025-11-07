import dayjs from "dayjs";

export async function http(method, path, body) {
  const r = await fetch(path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined
  });
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  try { return await r.json(); } catch { return {}; }
}

export const pacientes = {
  list: () => http("GET", "/api/users"),
  create: (x) => http("POST", "/api/users", x),
};

export const medicos = {
  list: async () => {
    const arr = await http("GET", "/api/medicos");
    return arr.map(p => ({ id: p.id, nombre: p.name, tarifa: p.price }));
  },
  get: async (id) => {
    const p = await http("GET", `/api/medicos/${id}`);
    return { id: p.id, nombre: p.name, tarifa: p.price };
  },
};

export function generarDisponibilidad() {
  const out = [];
  for (let d = 0; d < 7; d++) {
    const base = dayjs().add(d, "day").hour(9).minute(0).second(0);
    for (const h of [0, 30, 60, 90, 120, 150, 180]) {
      out.push(base.add(h, "minute").format("YYYY-MM-DD HH:mm"));
    }
  }
  return out;
}

export const citas = {
  crear: async ({ medicoId, pacienteNombre, fechaHora }) => {
    const res = await http("POST", "/api/citas", {
      name: `Cita con médico ${medicoId} - ${pacienteNombre}`,
      price: 0,
      fechaHora
    });
    return { id: res.id ?? Math.floor(Math.random() * 10000) };
  }
};
