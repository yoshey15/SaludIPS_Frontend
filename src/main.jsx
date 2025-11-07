import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./pages/App.jsx";
import Home from "./pages/Home.jsx";
import Medicos from "./pages/Medicos.jsx";
import MedicoDetalle from "./pages/MedicoDetalle.jsx";
import Reserva from "./pages/Reserva.jsx";
import Usuarios from "./pages/Usuarios.jsx";
import "./styles.css";
import './index.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "usuarios", element: <Usuarios /> },
      { path: "medicos", element: <Medicos /> },
      { path: "medicos/:id", element: <MedicoDetalle /> },
      { path: "reserva", element: <Reserva /> }
    ]
  }
]);

createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
