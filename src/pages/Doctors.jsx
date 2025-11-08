import { useEffect, useState } from "react";
import { DoctorsAPI } from "../clinicalApi";

export default function Doctors() {
  const empty = { name: "", email: "", specialty: "" };
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function load() {
    setLoading(true);
    setErr("");
    try {
      const data = await DoctorsAPI.list();
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(String(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function onChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      if (editingId) await DoctorsAPI.update(editingId, form);
      else           await DoctorsAPI.create(form);
      setForm(empty);
      setEditingId(null);
      await load();
    } catch (e) {
      setErr(String(e));
    }
  }

  function onEdit(r) {
    setForm({
      name: r.name ?? "",
      email: r.email ?? "",
      specialty: r.specialty ?? ""
    });
    setEditingId(r.id);
  }

  async function onDelete(id) {
    if (!confirm("¿Eliminar este doctor?")) return;
    try {
      await DoctorsAPI.remove(id);
      await load();
    } catch (e) {
      setErr(String(e));
    }
  }

  return (
    <div style={{maxWidth: 900, margin: "0 auto", padding: 16}}>
      <h2>Doctores</h2>

      {err && <div style={{background:"#ffe5e5", padding:8, border:"1px solid #f99", marginBottom:12}}>
        Error: {err}
      </div>}

      <form onSubmit={onSubmit} style={{display:"grid", gap:8, gridTemplateColumns:"1fr 1fr 1fr auto"}}>
        <input name="name" placeholder="Nombre"      value={form.name}      onChange={onChange} required />
        <input name="email" placeholder="Email"       value={form.email}     onChange={onChange} required />
        <input name="specialty" placeholder="Especialidad" value={form.specialty} onChange={onChange} required />
        <button type="submit" disabled={loading}>{editingId ? "Guardar" : "Crear"}</button>
      </form>

      <div style={{marginTop:16}}>
        {loading ? "Cargando..." : (
          <table border="1" cellPadding="6" style={{width:"100%", borderCollapse:"collapse"}}>
            <thead>
              <tr>
                <th>ID</th><th>Nombre</th><th>Email</th><th>Especialidad</th><th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.name}</td>
                  <td>{r.email}</td>
                  <td>{r.specialty}</td>
                  <td style={{whiteSpace:"nowrap"}}>
                    <button onClick={() => onEdit(r)}>Editar</button>{" "}
                    <button onClick={() => onDelete(r.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={5} style={{textAlign:"center"}}>Sin registros</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
