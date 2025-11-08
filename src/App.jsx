// src/App.jsx
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Doctors from "./pages/Doctors";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function Home() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((c) => c + 1)}>
          count is {count}
        </button>
        <p>
          Edita <code>src/App.jsx</code> y guarda para probar HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click en los logos de Vite y React para saber más
      </p>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <header style={{ padding: 12 }}>
        <nav style={{ display: "flex", gap: 12 }}>
          <Link to="/">Inicio</Link>
          <Link to="/doctores">Doctores</Link>
        </nav>
      </header>

      <main style={{ padding: 12 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctores" element={<Doctors />} />
          <Route path="*" element={<div>404 - Página no encontrada</div>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

