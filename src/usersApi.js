async function http(method, path, body) {
  const r = await fetch(path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined
  });
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  try { return await r.json(); } catch { return {}; }
}

export const users = {
  list: () => http("GET", "/api/users"),
  get:  (id) => http("GET", `/api/users/${id}`),
  create: (x) => http("POST", "/api/users", x),
  update: (id, x) => http("PUT", `/api/users/${id}`, x),
  remove: (id) => http("DELETE", `/api/users/${id}`)
};
