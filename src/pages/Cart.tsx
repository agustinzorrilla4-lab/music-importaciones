import { useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { getProductById } from "@/data/products";
import { formatPrice, whatsappLink } from "@/lib/format";
import ProductImage from "@/components/ProductImage";
import EmptyState from "@/components/EmptyState";

type BuyerInfo = {
  name: string;
  locality: string;
  postalCode: string;
};

const EMPTY_BUYER: BuyerInfo = { name: "", locality: "", postalCode: "" };

export default function Cart() {
  const { lines, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
  const [buyer, setBuyer] = useState<BuyerInfo>(EMPTY_BUYER);
  const [touched, setTouched] = useState(false);

  const errors = useMemo(() => {
    const e: Partial<Record<keyof BuyerInfo, string>> = {};
    if (!buyer.name.trim()) e.name = "Ingresá tu nombre y apellido.";
    if (!buyer.locality.trim()) e.locality = "Ingresá tu localidad.";
    if (!buyer.postalCode.trim()) e.postalCode = "Ingresá tu código postal.";
    return e;
  }, [buyer]);

  const hasErrors = Object.keys(errors).length > 0;

  // Detalle textual del pedido (nombre × cantidad = subtotal parcial).
  const orderDetail = useMemo(() => {
    return lines
      .map((line) => {
        const product = getProductById(line.productId);
        if (!product) return null;
        const variantSuffix = line.variant ? ` (${line.variant})` : "";
        const unit =
          product.price !== undefined ? formatPrice(product.price) : "Consultar precio";
        const lineTotal =
          product.price !== undefined
            ? ` — Subtotal: ${formatPrice(product.price * line.quantity)}`
            : "";
        return `• ${product.name}${variantSuffix} × ${line.quantity} — Precio unitario: ${unit}${lineTotal}`;
      })
      .filter((line): line is string => Boolean(line))
      .join("\n");
  }, [lines]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (hasErrors) return;

    const totalLine =
      subtotal > 0
        ? `\nTotal estimado: ${formatPrice(subtotal)}`
        : "\nTotal a confirmar según precios y disponibilidad.";

    const message =
      `Hola Music Importaciones, quiero hacer este pedido:\n\n` +
      `${orderDetail}\n` +
      `${totalLine}\n\n` +
      `Datos de contacto:\n` +
      `• Nombre: ${buyer.name.trim()}\n` +
      `• Localidad: ${buyer.locality.trim()}\n` +
      `• Código postal: ${buyer.postalCode.trim()}\n\n` +
      `Quedo a la espera de que me confirmen disponibilidad, forma de pago y envío. ¡Gracias!`;

    window.open(whatsappLink(message), "_blank", "noopener");
  }

  if (lines.length === 0) {
    return (
      <div className="container-page section">
        <h1 className="sr-only">Tu carrito</h1>
        <EmptyState
          title="Tu carrito está vacío"
          description="Sumá productos al carrito y armá tu pedido para enviarlo por WhatsApp."
          actionLabel="Ir al catálogo"
          actionTo="/catalogo"
        />
      </div>
    );
  }

  const hasPricelessLine = lines.some((line) => {
    const product = getProductById(line.productId);
    return !product || product.price === undefined;
  });

  return (
    <div className="container-page section">
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">Tu carrito</h1>
      <p className="mt-2 max-w-2xl text-sm text-ink-soft">
        Revisá tu pedido, cargá tus datos de contacto y envialo por WhatsApp para
        que te confirmemos disponibilidad, forma de pago y envío.
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {lines.map((line) => {
            const product = getProductById(line.productId);
            if (!product) return null;
            return (
              <div
                key={`${line.productId}-${line.variant ?? "default"}`}
                className="card flex gap-4 p-4"
              >
                <Link
                  to={`/producto/${product.slug}`}
                  className="h-20 w-20 shrink-0 overflow-hidden rounded-xl"
                >
                  <ProductImage
                    source={product.images[0]}
                    label={product.name}
                    className="h-full w-full"
                  />
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        to={`/producto/${product.slug}`}
                        className="text-sm font-semibold text-ink hover:text-violet"
                      >
                        {product.name}
                      </Link>
                      {line.variant && (
                        <p className="text-xs text-ink-faint">{line.variant}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(line.productId, line.variant)}
                      className="text-xs text-ink-faint hover:text-danger"
                    >
                      Quitar
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-lg border border-ink/15">
                      <button
                        type="button"
                        className="px-2.5 py-1 text-ink-soft"
                        onClick={() =>
                          updateQuantity(line.productId, line.quantity - 1, line.variant)
                        }
                        aria-label="Restar cantidad"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm">{line.quantity}</span>
                      <button
                        type="button"
                        className="px-2.5 py-1 text-ink-soft"
                        onClick={() =>
                          updateQuantity(line.productId, line.quantity + 1, line.variant)
                        }
                        aria-label="Sumar cantidad"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm font-bold text-ink">
                      {product.price !== undefined
                        ? formatPrice(product.price * line.quantity)
                        : "Consultar precio"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          <button
            type="button"
            onClick={clearCart}
            className="text-xs text-ink-faint hover:text-danger"
          >
            Vaciar carrito
          </button>
        </div>

        <aside className="card h-fit space-y-5 p-6">
          <h2 className="text-lg font-bold text-ink">Resumen del pedido</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-ink-soft">
              <span>Subtotal</span>
              <span>
                {subtotal > 0 ? formatPrice(subtotal) : "A confirmar"}
              </span>
            </div>
            <div className="flex justify-between border-t border-ink/10 pt-3 text-base font-bold text-ink">
              <span>Total estimado</span>
              <span>
                {subtotal > 0 ? formatPrice(subtotal) : "A confirmar"}
              </span>
            </div>
            {hasPricelessLine && (
              <p className="text-xs text-ink-faint">
                Hay productos con precio a consultar. Te confirmamos el total por WhatsApp.
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 border-t border-ink/10 pt-4" noValidate>
            <p className="text-sm font-semibold text-ink">Tus datos</p>

            <div>
              <input
                className="input"
                placeholder="Nombre y apellido"
                aria-label="Nombre y apellido"
                value={buyer.name}
                onChange={(e) => setBuyer((b) => ({ ...b, name: e.target.value }))}
                required
              />
              {touched && errors.name && (
                <p className="mt-1 text-xs text-danger">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                className="input"
                placeholder="Localidad"
                aria-label="Localidad"
                value={buyer.locality}
                onChange={(e) => setBuyer((b) => ({ ...b, locality: e.target.value }))}
                required
              />
              {touched && errors.locality && (
                <p className="mt-1 text-xs text-danger">{errors.locality}</p>
              )}
            </div>

            <div>
              <input
                className="input"
                placeholder="Código postal"
                aria-label="Código postal"
                inputMode="numeric"
                value={buyer.postalCode}
                onChange={(e) => setBuyer((b) => ({ ...b, postalCode: e.target.value }))}
                required
              />
              {touched && errors.postalCode && (
                <p className="mt-1 text-xs text-danger">{errors.postalCode}</p>
              )}
            </div>

            <button type="submit" className="btn-whatsapp w-full">
              Enviar pedido por WhatsApp
            </button>

            <p className="text-center text-xs text-ink-faint">
              Al enviar el pedido se abre WhatsApp con tu mensaje listo. La
              disponibilidad, la forma de pago y el envío se confirman por chat.
            </p>
          </form>
        </aside>
      </div>
    </div>
  );
}
