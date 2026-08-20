// Prefija cualquier ruta pública con el base de despliegue.
// - En raíz (`/`) devuelve la ruta original.
// - En subdirectorio (ej. `/music-importaciones/` en GitHub Pages) prepende ese
//   segmento para que las imágenes referenciadas como "/brand/foo.png" carguen
//   desde "/music-importaciones/brand/foo.png".
const BASE = import.meta.env.BASE_URL;

export function asset(path: string): string {
  return BASE + path.replace(/^\//, "");
}
