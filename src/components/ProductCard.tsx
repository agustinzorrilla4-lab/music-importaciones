import { useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "@/types";
import ProductImage from "./ProductImage";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import WhatsAppButton from "./WhatsAppButton";
import DeliveryPromise from "./DeliveryPromise";

export default function ProductCard({ product }: { product: Product }) {
  const { toggleFavorite, isFavorite, addToCart } = useCart();
  const favorite = isFavorite(product.id);
  const [added, setAdded] = useState(false);
  const canBuy =
    product.price !== undefined &&
    !product.priceOnRequest &&
    product.stockQuantity > 0;

  return (
    <div className="card group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-cyan/35 hover:shadow-card">
      <div className="relative">
        <Link to={`/producto/${product.slug}`}>
          <ProductImage
            source={product.images[0]}
            label={product.name}
            className="aspect-square w-full"
          />
        </Link>

        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {product.badge === "oferta" && <span className="badge-offer">Oferta</span>}
          {product.badge === "nuevo" && <span className="badge-new">Nuevo</span>}
        </div>

        <button
          type="button"
          onClick={() => toggleFavorite(product.id)}
          aria-pressed={favorite}
          aria-label={
            favorite ? "Quitar de favoritos" : "Agregar a favoritos"
          }
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-cyan/10 bg-white/90 text-deep shadow-soft transition-transform hover:scale-105"
        >
          <span className={favorite ? "text-magenta" : "text-ink-faint"}>
            {favorite ? "♥" : "♡"}
          </span>
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">
          {product.brand}
        </p>
        <Link
          to={`/producto/${product.slug}`}
          className="line-clamp-2 text-sm font-semibold text-ink transition-colors hover:text-violet"
        >
          {product.name}
        </Link>

        <div className="mt-1">
          {product.price !== undefined && product.compareAtPrice && (
            <p className="text-xs text-ink-faint line-through">
              {formatPrice(product.compareAtPrice)}
            </p>
          )}
          {product.priceOnRequest || product.price === undefined ? (
            <p className="text-lg font-bold text-ink">Consultar precio</p>
          ) : (
            <p className="text-lg font-bold text-ink">{formatPrice(product.price)}</p>
          )}
          {product.price !== undefined && product.installments && (
            <p className="text-xs text-ink-soft">
              {product.installments.count}x {formatPrice(product.installments.amount)}{" "}
              {product.installments.interestFree ? "sin interés" : ""}
            </p>
          )}
        </div>

        <DeliveryPromise compact />

        <div className="mt-auto space-y-2">
          {canBuy && (
            <button
              type="button"
              onClick={() => {
                addToCart(product, 1);
                setAdded(true);
                window.setTimeout(() => setAdded(false), 2000);
              }}
              className="btn-primary w-full"
            >
              {added ? "✓ Agregado" : "Agregar al carrito"}
            </button>
          )}
          <WhatsAppButton
            className={canBuy ? "btn-whatsapp w-full" : "btn-primary w-full"}
            message={`Hola, quiero consultar precio y disponibilidad de ${product.name}.`}
          >
            Consultar por WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </div>
  );
}
