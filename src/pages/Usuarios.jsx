import React, { useEffect, useState } from "react";
import { users } from "../usersApi";

export default function Usuarios() {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  async function load() {
    try {
      const data = await users.list();
      setList(data);
    } catch (e) {
      console.error(e);
      alert("Error cargando usuarios");
    }
  }

  useEffect(() => { load(); }, []);

  async function crear() {
    if (!name || !email) return alert("Completa nombre y email");
    try {
      await users.create({ name, email });
      setName(""); setEmail("");
      await load();
    } catch (e) {
      console.error(e);
      alert("Error creando usuario");
    }
  }

  function startEdit(u) {
    setEditId(u.id);
    setEditName(u.name);
    setEditEmail(u.email);
  }
  function cancelEdit() {
    setEditId(null); setEditName(""); setEditEmail("");
  }
  async function saveEdit() {
    if (!editId) return;
    try {
      await users.update(editId, { name: editName, email: editEmail });
      cancelEdit();
      await load();
    } catch (e) {
      console.error(e);
      alert("Error actualizando usuario");
    }
  }

  async function del(id) {
    if (!confirm("¿Eliminar usuario?")) return;
    try {
      await users.remove(id);
      await load();
    } catch (e) {
      console.error(e);
      alert("Error eliminando usuario");
    }
  }

  return (
    <section>
      <h2>Usuarios (Pacientes)</h2>

      <div className="row">
        <input placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Email"   value={email} onChange={e=>setEmail(e.target.value)} />
        <button onClick={crear}>Crear</button>
      </div>

      <table>
        <thead><tr><th>Id</th><th>Nombre</th><th>Email</th><th style={{width:220}}></th></tr></thead>
        <tbody>
          {list.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>
                {editId===u.id ? (
                  <input value={editName} onChange={e=>setEditName(e.target.value)} />
                ) : u.name}
              </td>
              <td>
                {editId===u.id ? (
                  <input value={editEmail} onChange={e=>setEditEmail(e.target.value)} />
                ) : u.email}
              </td>
              <td>
                {editId===u.id ? (
                  <>
                    <button onClick={saveEdit}>Guardar</button>
                    <button onClick={cancelEdit} style={{marginLeft:8}}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={()=>startEdit(u)}>Editar</button>
                    <button onClick={()=>del(u.id)} style={{marginLeft:8}}>Eliminar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {list.length===0 && (
            <tr><td colSpan={4}>Sin usuarios aún</td></tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
