import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine, Product } from "@/types";
import { getProductById } from "@/data/products";

const STORAGE_KEY = "music-importaciones:cart";
const FAVORITES_KEY = "music-importaciones:favorites";

interface CartContextValue {
  lines: CartLine[];
  addToCart: (product: Product, quantity?: number, variant?: string) => void;
  removeFromCart: (productId: string, variant?: string) => void;
  updateQuantity: (productId: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

// El almacenamiento puede no estar disponible (navegación privada en Safari,
// cookies bloqueadas, vistas embebidas). En ese caso la tienda sigue andando:
// solo se pierde la persistencia entre visitas.
function writeStorage(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* sin persistencia */
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() =>
    readStorage<CartLine[]>(STORAGE_KEY, []).filter((line) => {
      const product = getProductById(line.productId);
      return product?.price !== undefined && !product.priceOnRequest;
    })
  );
  const [favorites, setFavorites] = useState<string[]>(() =>
    readStorage(FAVORITES_KEY, [])
  );

  useEffect(() => {
    writeStorage(STORAGE_KEY, lines);
  }, [lines]);

  useEffect(() => {
    writeStorage(FAVORITES_KEY, favorites);
  }, [favorites]);

  function addToCart(product: Product, quantity = 1, variant?: string) {
    if (product.priceOnRequest || product.price === undefined) return;
    setLines((prev) => {
      const existing = prev.find(
        (l) => l.productId === product.id && l.variant === variant
      );
      if (existing) {
        return prev.map((l) =>
          l.productId === product.id && l.variant === variant
            ? { ...l, quantity: l.quantity + quantity }
            : l
        );
      }
      return [...prev, { productId: product.id, quantity, variant }];
    });
  }

  function removeFromCart(productId: string, variant?: string) {
    setLines((prev) =>
      prev.filter((l) => !(l.productId === productId && l.variant === variant))
    );
  }

  function updateQuantity(productId: string, quantity: number, variant?: string) {
    if (quantity <= 0) {
      removeFromCart(productId, variant);
      return;
    }
    setLines((prev) =>
      prev.map((l) =>
        l.productId === productId && l.variant === variant ? { ...l, quantity } : l
      )
    );
  }

  function clearCart() {
    setLines([]);
  }

  function toggleFavorite(productId: string) {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }

  function isFavorite(productId: string) {
    return favorites.includes(productId);
  }

  const totalItems = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );

  const subtotal = useMemo(
    () =>
      lines.reduce((sum, l) => {
        const product = getProductById(l.productId);
        return product?.price !== undefined ? sum + product.price * l.quantity : sum;
      }, 0),
    [lines]
  );

  const value: CartContextValue = {
    lines,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    favorites,
    toggleFavorite,
    isFavorite,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
