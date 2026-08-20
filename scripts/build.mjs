import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { build } from "vite";
import react from "@vitejs/plugin-react";

// Permite deployar a subdirectorio (GitHub Pages) sin romper rutas.
// Ej: PUBLIC_BASE=/music-importaciones/  para <user>.github.io/music-importaciones/
const publicBase = process.env.PUBLIC_BASE ?? "/";

await build({
  configFile: false,
  base: publicBase,
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "src"),
    },
  },
  define: {
    __PUBLIC_BASE__: JSON.stringify(publicBase),
  },
});

await mkdir("dist/server", { recursive: true });
await copyFile("worker/index.js", "dist/server/index.js");

// SPA fallback para GitHub Pages: cuando una ruta no existe (ej. /catalogo
// tras un refresh), Pages busca 404.html y lo sirve. Copiando index.html a
// 404.html conservamos las rutas del BrowserRouter.
await copyFile("dist/index.html", "dist/404.html");
