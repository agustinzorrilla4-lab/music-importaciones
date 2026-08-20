import { whatsappLink } from "@/lib/format";

const ITEMS = [
  {
    icon: "◌",
    title: "Atención personalizada",
    text: "Escribinos por WhatsApp",
    href: whatsappLink("Hola, quiero recibir atención personalizada de Music Importaciones."),
  },
  { icon: "✓", title: "Datos claros", text: "Fichas con información validada" },
  { icon: "↗", title: "Envío gratis", text: "Zonas habilitadas, de lunes a viernes" },
  { icon: "◇", title: "Condiciones claras", text: "Se informan antes de comprar" },
];

export default function TrustBar() {
  return (
    <div className="border-y border-cyan/10 bg-surface-soft">
      <div className="container-page grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
        {ITEMS.map((item) => {
          const content = (
            <>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-violet/20 bg-white text-lg font-bold text-violet shadow-soft" aria-hidden="true">
              {item.icon}
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">{item.title}</p>
              <p className="text-xs text-ink-soft">{item.text}</p>
            </div>
            </>
          );

          return item.href ? (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl transition-transform hover:-translate-y-0.5"
              aria-label="Contactar por WhatsApp para recibir atención personalizada"
            >
              {content}
            </a>
          ) : (
            <div key={item.title} className="flex items-center gap-3">
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
