// Tipos centrales de la tienda. Mantené esta estructura si agregás productos
// o categorías nuevas: el resto de la app se adapta automáticamente.

export type CategorySlug =
  | "celulares"
  | "audio"
  | "computacion"
  | "gaming"
  | "smart-home"
  | "tablets"
  | "aspiradoras-y-limpieza"
  | "pequenos-electrodomesticos"
  | "cargadores-y-accesorios";

export interface Category {
  slug: CategorySlug;
  name: string;
  // Emoji/ícono simple usado como placeholder visual de categoría.
  icon: string;
}

export type StockStatus = "in_stock" | "limited" | "out_of_stock" | "on_request";

export interface InstallmentPlan {
  // Solo cargar cuando la cuota y el medio de pago estén vigentes y confirmados.
  count: number;
  amount: number;
  interestFree: boolean;
}

export interface ProductVariant {
  label: string; // ej: "Color", "Almacenamiento"
  options: string[];
}

export interface SpecItem {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: CategorySlug;
  // Se deja vacío hasta tener un precio vigente confirmado.
  price?: number;
  priceOnRequest?: boolean;
  compareAtPrice?: number; // precio anterior, para mostrar descuento
  installments?: InstallmentPlan;
  // Puede ser una ruta pública de imagen o un degradé "COLOR1,COLOR2" como fallback.
  images: string[];
  badge?: "oferta" | "nuevo";
  shortDescription: string;
  description: string[];
  specs: SpecItem[];
  shipping: string;
  warranty: string;
  // Meses de garantía oficial. Se muestra destacado en la ficha del producto.
  warrantyMonths: number;
  stock: StockStatus;
  variants?: ProductVariant[];
  relatedIds?: string[];
  // Producto identificado pero pendiente de foto/dato antes de mostrarse en la tienda.
  hidden?: boolean;
}

export interface CartLine {
  productId: string;
  quantity: number;
  variant?: string;
}
