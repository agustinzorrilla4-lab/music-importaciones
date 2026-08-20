import type { Category } from "@/types";
import { visibleProducts } from "@/data/products";

// Editá nombre/ícono libremente. El "slug" es el que se usa en las URLs
// (/catalogo?categoria=slug), así que si lo cambiás actualizá también
// los productos que la referencian en products.ts.
export const categories: Category[] = [
  { slug: "celulares", name: "Celulares", icon: "📱" },
  { slug: "audio", name: "Audio", icon: "🎧" },
  { slug: "computacion", name: "Computación", icon: "💻" },
  { slug: "gaming", name: "Gaming", icon: "🎮" },
  { slug: "smart-home", name: "Smart Home", icon: "🏠" },
  { slug: "tablets", name: "Tablets", icon: "🖥️" },
  { slug: "aspiradoras-y-limpieza", name: "Aspiradoras y limpieza", icon: "🧹" },
  { slug: "pequenos-electrodomesticos", name: "Pequeños electrodomésticos", icon: "🔌" },
  { slug: "cargadores-y-accesorios", name: "Cargadores y accesorios", icon: "🔋" },
];

// Solo las categorías con al menos un producto visible. Es la lista que se
// muestra al usuario en menús y grilla del home; el catálogo completo sigue
// disponible en `categories` para no romper filtros o URLs anteriores.
export const activeCategories: Category[] = categories.filter((cat) =>
  visibleProducts.some((product) => product.category === cat.slug)
);

export function getCategoryName(slug: string): string {
  return categories.find((c) => c.slug === slug)?.name ?? slug;
}
