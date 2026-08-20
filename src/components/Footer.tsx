import { Link } from "react-router-dom";
import { activeCategories as categories } from "@/data/categories";
import { whatsappLink } from "@/lib/format";
import { asset } from "@/lib/asset";

const INFO_LINKS = [
  { label: "Nosotros", to: "/nosotros" },
  { label: "Preguntas frecuentes", to: "/preguntas-frecuentes" },
  { label: "Envíos", to: "/envios" },
  { label: "Pagos", to: "/pagos" },
  { label: "Garantía y cambios", to: "/garantia-y-cambios" },
  { label: "Contacto", to: "/contacto" },
  { label: "Política de privacidad", to: "/privacidad" },
];

export default function Footer() {
  return (
    <footer className="border-t border-cyan/20 bg-deep text-ink">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <img
              src={asset("/brand/logo-192.png")}
              alt="Logo de Music Importaciones"
              className="h-10 w-10 rounded-xl border border-cyan/30 object-cover shadow-soft"
              width={40}
              height={40}
              loading="lazy"
            />
            <span className="text-base font-bold text-ink">Music Importaciones</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Tecnología seleccionada, atención de verdad. Comprá con confianza: estamos
            antes, durante y después de la venta.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href={whatsappLink("Hola, quiero hacer una consulta sobre Music Importaciones.")}
              target="_blank"
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-deep shadow-soft hover:text-violet"
              aria-label="Contactar por WhatsApp"
            >
              💬
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">Categorías</h4>
          <ul className="mt-4 space-y-2 text-sm text-ink-soft">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link to={`/catalogo?categoria=${cat.slug}`} className="hover:text-cyan">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">Ayuda</h4>
          <ul className="mt-4 space-y-2 text-sm text-ink-soft">
            {INFO_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-cyan">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">Atención personalizada</h4>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            ¿Tenés una consulta? Escribinos por WhatsApp para confirmar precio,
            disponibilidad y condiciones de compra.
          </p>
          <p className="mt-2 text-sm font-semibold text-cyan">11 5971-5328</p>
          <a
            href={whatsappLink("Hola, quiero hacer una consulta sobre Music Importaciones.")}
            target="_blank"
            rel="noreferrer"
            className="btn-whatsapp mt-4 inline-flex"
          >
            Escribinos ahora
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <p className="container-page text-center text-xs text-ink-faint">
          © {new Date().getFullYear()} Music Importaciones — Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
