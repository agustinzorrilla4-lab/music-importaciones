import { useCallback, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import { formatPrice, whatsappLink } from "@/lib/format";
import ProductImage from "@/components/ProductImage";
import ProductCard from "@/components/ProductCard";
import StockBadge from "@/components/StockBadge";
import Accordion from "@/components/Accordion";
import WhatsAppButton from "@/components/WhatsAppButton";
import DeliveryPromise from "@/components/DeliveryPromise";
import { useCart } from "@/context/CartContext";
import NotFound from "./NotFound";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = slug ? getProductBySlug(slug) : undefined;
  const { toggleFavorite, isFavorite } = useCart();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    product?.variants?.[0]?.options[0]
  );

  const related = useMemo(() => (product ? getRelatedProducts(product) : []), [product]);

  // Navegación de la galería. Cicla al llegar a los extremos, como Mercado Libre.
  const imageCount = product?.images.length ?? 0;
  const touchStartX = useRef<number | null>(null);

  const showPrev = useCallback(() => {
    setActiveImage((i) => (imageCount ? (i - 1 + imageCount) % imageCount : 0));
  }, [imageCount]);

  const showNext = useCallback(() => {
    setActiveImage((i) => (imageCount ? (i + 1) % imageCount : 0));
  }, [imageCount]);

  if (!product || product.hidden) {
    return <NotFound />;
  }

  const favorite = isFavorite(product.id);
  const discount = product.price !== undefined && product.compareAtPrice
    ? Math.round(100 - (product.price / product.compareAtPrice) * 100)
    : null;

  return (
    <div className="container-page section animate-fade-in">
      <nav className="mb-6 text-xs text-ink-faint">
        <Link to="/" className="hover:text-violet">
          Inicio
        </Link>{" "}
        /{" "}
        <Link to={`/catalogo?categoria=${product.category}`} className="hover:text-violet">
          {product.category}
        </Link>{" "}
        / <span className="text-ink-soft">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Galería */}
        <div>
          <div
            className="card group relative overflow-hidden p-0"
            role="region"
            aria-roledescription="carrusel"
            aria-label={`Fotos de ${product.name}`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") { e.preventDefault(); showPrev(); }
              if (e.key === "ArrowRight") { e.preventDefault(); showNext(); }
            }}
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const delta = e.changedTouches[0].clientX - touchStartX.current;
              if (delta > 50) showPrev();
              if (delta < -50) showNext();
              touchStartX.current = null;
            }}
          >
            <ProductImage
              source={product.images[activeImage]}
              label={`${product.name} — foto ${activeImage + 1} de ${product.images.length}`}
              priority
              className="aspect-square w-full"
            />

            {product.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPrev}
                  aria-label="Foto anterior"
                  className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink/10 bg-white/90 text-xl font-bold text-deep shadow-soft transition-all hover:bg-white hover:shadow-card focus-visible:ring-2 focus-visible:ring-violet sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
                >
                  <span aria-hidden="true">‹</span>
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Foto siguiente"
                  className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink/10 bg-white/90 text-xl font-bold text-deep shadow-soft transition-all hover:bg-white hover:shadow-card focus-visible:ring-2 focus-visible:ring-violet sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
                >
                  <span aria-hidden="true">›</span>
                </button>

                <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-deep/75 px-2.5 py-1 text-xs font-semibold text-white">
                  {activeImage + 1} / {product.images.length}
                </span>

                <p aria-live="polite" className="sr-only">
                  Foto {activeImage + 1} de {product.images.length}
                </p>
              </>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 flex flex-wrap gap-3" role="group" aria-label={`Miniaturas de ${product.name}`}>
              {product.images.map((img, index) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-pressed={activeImage === index}
                  aria-label={`Ver foto ${index + 1} de ${product.images.length} de ${product.name}`}
                  className={`h-16 w-16 overflow-hidden rounded-xl border-2 transition-colors ${
                    activeImage === index ? "border-violet" : "border-transparent hover:border-cyan/40"
                  }`}
                >
                  <ProductImage
                    source={img}
                    label={`Miniatura ${index + 1} de ${product.name}`}
                    className="h-full w-full"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
                {product.brand}
              </p>
              <h1 className="mt-1 text-2xl font-bold text-ink sm:text-3xl">
                {product.name}
              </h1>
            </div>
            <button
              type="button"
              onClick={() => toggleFavorite(product.id)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/10 text-lg"
              aria-pressed={favorite}
              aria-label={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
            >
              <span className={favorite ? "text-magenta" : "text-ink-faint"}>
                {favorite ? "♥" : "♡"}
              </span>
            </button>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <StockBadge status={product.stock} />
            {product.badge === "oferta" && <span className="badge-offer">Oferta</span>}
            {product.badge === "nuevo" && <span className="badge-new">Nuevo</span>}
          </div>

          <div className="mt-5">
            {product.price !== undefined && product.compareAtPrice && (
              <div className="flex items-center gap-2">
                <p className="text-sm text-ink-faint line-through">
                  {formatPrice(product.compareAtPrice)}
                </p>
                {discount !== null && (
                  <span className="badge-offer">{discount}% OFF</span>
                )}
              </div>
            )}
            {product.priceOnRequest || product.price === undefined ? (
              <>
                <p className="text-2xl font-extrabold text-ink">Consultá precio y disponibilidad</p>
                <p className="mt-1 text-sm text-ink-soft">Los valores se confirman por WhatsApp antes de comprar.</p>
              </>
            ) : (
              <p className="text-3xl font-extrabold text-ink">{formatPrice(product.price)}</p>
            )}
            {product.price !== undefined && product.installments && (
              <p className="mt-1 text-sm text-ink-soft">
                {product.installments.count}x {formatPrice(product.installments.amount)}{" "}
                {product.installments.interestFree ? "sin interés" : ""} (medios de pago
                a confirmar)
              </p>
            )}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            {product.shortDescription}
          </p>

          <div className="mt-5">
            <DeliveryPromise />
          </div>

          {product.variants?.map((variant) => (
            <div key={variant.label} className="mt-5">
              <p className="text-sm font-semibold text-ink">{variant.label}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {variant.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelectedVariant(option)}
                    className={`rounded-full border px-4 py-1.5 text-sm ${
                      selectedVariant === option
                        ? "border-violet bg-violet-50 text-violet"
                        : "border-ink/15 text-ink-soft"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-6 space-y-2 rounded-2xl border border-violet/25 bg-violet/[0.06] p-4">
            <div className="flex items-start gap-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet text-base text-white"
                aria-hidden="true"
              >
                ✓
              </span>
              <div>
                <p className="text-sm font-bold text-ink">
                  {product.warrantyOfficial ? "Garantía oficial" : "Garantía"} de{" "}
                  {product.warrantyMonths} meses
                </p>
                <p className="mt-0.5 text-xs text-ink-soft">
                  Respaldo ante fallas de fábrica.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan text-base text-deep"
                aria-hidden="true"
              >
                ⛨
              </span>
              <div>
                <p className="text-sm font-bold text-ink">Compra protegida 30 días</p>
                <p className="mt-0.5 text-xs text-ink-soft">
                  Si el producto no llega o no es lo publicado, te devolvemos el dinero.
                </p>
              </div>
            </div>
          </div>

          <WhatsAppButton
            className="btn-whatsapp mt-6 w-full"
            message={`Hola, quiero consultar precio y disponibilidad de ${product.name}${selectedVariant ? ` (${selectedVariant})` : ""}.`}
          >
            Consultar por WhatsApp
          </WhatsAppButton>

          <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-ink-soft">
            <div className="card p-3">
              <p className="font-semibold text-ink">Envío</p>
              <p className="mt-1 font-semibold text-[#00a650]">Envío gratis</p>
              <p className="mt-1">{product.shipping}</p>
            </div>
            <div className="card p-3">
              <p className="font-semibold text-ink">Garantía</p>
              <p className="mt-1">{product.warranty}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Descripción */}
      <div className="mt-14 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="text-xl font-bold text-ink">Descripción</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink-soft">
            {product.description.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="text-violet">•</span>
                {line}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-xl font-bold text-ink">Más información</h2>
          <div className="mt-4">
            <Accordion
              items={[
                {
                  title: "Especificaciones",
                  content: (
                    <ul className="space-y-1.5">
                      {product.specs.map((spec) => (
                        <li key={spec.label} className="flex justify-between gap-4">
                          <span className="text-ink-faint">{spec.label}</span>
                          <span className="text-right text-ink">{spec.value}</span>
                        </li>
                      ))}
                    </ul>
                  ),
                },
                {
                  title: "Medios de pago",
                  content:
                    "Los medios de pago y sus condiciones se confirman junto con el precio y la disponibilidad de la unidad.",
                },
                {
                  title: "Envíos",
                  content: product.shipping,
                },
                {
                  title: "Cambios y devoluciones",
                  content:
                    "Las condiciones de cambios, devoluciones y garantía se informan antes de confirmar la compra.",
                },
                {
                  title: "Preguntas frecuentes",
                  content:
                    "Consultá nuestra sección de preguntas frecuentes o escribinos por WhatsApp ante cualquier duda puntual sobre este producto.",
                },
              ]}
            />
          </div>
        </div>

        <div className="card h-fit p-5">
          <h3 className="text-sm font-semibold text-ink">¿Tenés dudas antes de comprar?</h3>
          <p className="mt-2 text-sm text-ink-soft">
            Te ayudamos a elegir el producto justo para vos.
          </p>
          <a
            href={whatsappLink(`Hola, tengo una consulta sobre ${product.name}.`)}
            target="_blank"
            rel="noreferrer"
            className="btn-whatsapp mt-4 w-full"
          >
            Escribinos por WhatsApp
          </a>
        </div>
      </div>

      {/* Relacionados */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-bold text-ink">Productos relacionados</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
