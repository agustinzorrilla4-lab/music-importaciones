import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import "./index.css";

// Cuando la app se sirve desde un subdirectorio (ej. GitHub Pages en
// /music-importaciones/), Vite expone la ruta base en import.meta.env.BASE_URL.
// Sacamos la barra final para pasársela al Router como basename.
const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={routerBasename || undefined}>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
