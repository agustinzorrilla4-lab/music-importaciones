import WhatsAppButton from "@/components/WhatsAppButton";

const PASOS = [
  {
    titulo: "Sello de seguridad intacto",
    detalle: "Ves la caja cerrada antes de que la abramos.",
  },
  {
    titulo: "Verificamos el modelo",
    detalle: "Chequeamos juntos que el código sea exactamente el que compraste.",
  },
  {
    titulo: "IMEI a la vista",
    detalle: "Comparamos el IMEI impreso en la caja con el del equipo.",
  },
  {
    titulo: "Lo encendemos",
    detalle: "Probás que arranca, la pantalla y las cámaras antes de llevártelo.",
  },
];

export default function Pickup() {
  return (
    <div className="container-page section animate-fade-in">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Retiro en persona · Sin cargo</p>
        <h1 className="mt-1 text-2xl font-bold text-ink sm:text-3xl">
          Retirá y probalo con nosotros
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
          Abrimos la caja juntos y verificás el equipo antes de llevártelo. Si algo no
          está como esperabas, no te lo llevás. Sin discusiones después.
        </p>

        {/* El pago siempre va por el checkout: es lo que protege al comprador. */}
        <div className="mt-8 rounded-2xl border border-cyan/30 bg-cyan/[0.08] p-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-cyan">
            Pagás online, retirás en persona
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
            El pago se hace siempre desde la tienda, con tu compra registrada y
            protegida. El retiro es solo para que recibas el equipo en mano y lo
            revises. <strong className="text-ink">Nunca vas a tener que pagar en
            efectivo en el punto de retiro</strong>: si alguien te lo pide, no somos
            nosotros.
          </p>
        </div>

        <h2 className="mt-10 text-xl font-bold text-ink">Cómo funciona</h2>
        <ol className="mt-4 space-y-3 text-sm text-ink-soft">
          <li className="flex gap-3">
            <span className="font-bold text-cyan">1.</span>
            <span>
              Comprás y pagás en la tienda, con tu comprobante y tu número de orden.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-cyan">2.</span>
            <span>
              Coordinamos día y hora por WhatsApp. Llevamos tu equipo ese día:{" "}
              <strong className="text-ink">no queda stock guardado en el local</strong>.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-cyan">3.</span>
            <span>
              Vas con tu número de orden y tu DNI. Solo se entrega a quien compró.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-cyan">4.</span>
            <span>Verificás el equipo con nosotros y recién ahí te lo llevás.</span>
          </li>
        </ol>

        <h2 className="mt-10 text-xl font-bold text-ink">Qué verificamos juntos</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {PASOS.map((p, i) => (
            <div key={p.titulo} className="card flex gap-3 p-4">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet/20 text-sm font-bold tabular-nums text-violet"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">{p.titulo}</p>
                <p className="mt-0.5 text-sm text-ink-soft">{p.detalle}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-amber/30 bg-amber/[0.08] p-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-amber">
            Punto de retiro a confirmar
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
            Estamos cerrando la dirección y el horario del punto de retiro. Mientras
            tanto, escribinos por WhatsApp y coordinamos la entrega con vos.
          </p>
          <p className="mt-1.5 text-xs text-ink-faint">
            El punto de retiro es un local asociado que nos presta el espacio para la
            entrega. No es una sucursal de Music Importaciones.
          </p>
        </div>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-ink-soft">
          <section>
            <h2 className="text-xl font-bold text-ink">
              ¿Por qué ofrecemos retirar en persona?
            </h2>
            <p className="mt-3">
              Comprar tecnología online tiene tres dudas razonables: si el producto es
              nuevo, si es exactamente el modelo publicado y quién responde si falla.
            </p>
            <p className="mt-3">
              Retirando en persona las resolvés las tres <strong className="text-ink">antes</strong>{" "}
              de pagar el saldo o llevarte el equipo. No dependés de abrir una caja solo
              en tu casa y descubrir un problema después.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink">Si preferís que te lo enviemos</h2>
            <p className="mt-3">
              También podés recibirlo en tu domicilio. Hacemos entregas en el día en
              zonas habilitadas del AMBA y La Plata de lunes a viernes, y despachamos a
              todo el país por Correo Argentino. En ese caso la verificación la hacés
              vos al recibirlo, y tenés 30 días de compra protegida.
            </p>
          </section>
        </div>

        <div className="mt-8">
          <WhatsAppButton
            className="btn-whatsapp"
            message="Hola, quiero coordinar el retiro en persona de un producto."
          >
            Coordinar un retiro
          </WhatsAppButton>
        </div>
      </div>
    </div>
  );
}
