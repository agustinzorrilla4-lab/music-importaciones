import WhatsAppButton from "@/components/WhatsAppButton";

const PLAZOS = [
  {
    label: "Arrepentimiento",
    value: "10 días",
    detail: "corridos, sin justificar motivo",
  },
  {
    label: "Cambio voluntario",
    value: "15 días",
    detail: "corridos desde la entrega",
  },
  {
    label: "Te respondemos en",
    value: "48 h",
    detail: "hábiles, con número de gestión",
  },
];

const PROCESO = [
  "Iniciás el pedido desde el botón de arrepentimiento o por nuestro canal de atención.",
  "Te respondemos con las instrucciones y un número de gestión dentro de las 48 horas hábiles.",
  "Coordinamos el retiro o el envío del producto.",
  "Cuando lo recibimos y lo verificamos, te enviamos el reemplazo o iniciamos el reintegro.",
  "El reintegro se realiza por el medio de pago original. Los plazos de acreditación posteriores dependen del banco o de la pasarela de pago.",
];

export default function Returns() {
  return (
    <div className="container-page section animate-fade-in">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Tus derechos</p>
        <h1 className="mt-1 text-2xl font-bold text-ink sm:text-3xl">
          Cambios, devoluciones y reembolsos
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
          En Music Importaciones queremos que compres tranquilo. Acá explicamos, sin
          letra chica, cómo funcionan los cambios, las devoluciones y los reembolsos.
        </p>

        {/* Los tres plazos que el comprador viene a buscar, antes que el texto. */}
        <dl className="mt-8 grid gap-3 sm:grid-cols-3">
          {PLAZOS.map((p) => (
            <div key={p.label} className="card p-4">
              <dt className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-faint">
                {p.label}
              </dt>
              <dd className="mt-1.5 text-2xl font-extrabold tabular-nums text-ink">
                {p.value}
                <span className="mt-1 block text-sm font-normal leading-snug text-ink-soft">
                  {p.detail}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-ink-soft">
          <section>
            <h2 className="text-xl font-bold text-ink">Arrepentimiento de compra</h2>
            <p className="mt-3">
              En compras realizadas online podés solicitar la cancelación dentro del
              plazo legal aplicable, sin necesidad de justificar el motivo. En Argentina
              ese plazo es de <strong className="text-ink">10 días corridos</strong>{" "}
              contados desde la entrega del producto o desde la celebración del
              contrato, lo que ocurra último (Ley 24.240 de Defensa del Consumidor).
            </p>
            <p className="mt-3">
              La solicitud se inicia desde el{" "}
              <strong className="text-ink">botón de arrepentimiento</strong> disponible
              en la tienda. Una vez recibida, te indicamos los pasos para devolver el
              producto y gestionamos el reintegro por el{" "}
              <strong className="text-ink">mismo medio de pago</strong> que usaste.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink">
              Producto con falla, dañado o diferente al publicado
            </h2>
            <p className="mt-3">
              Si el producto llegó con una falla, dañado, incompleto o distinto a lo
              publicado, escribinos indicando tu{" "}
              <strong className="text-ink">número de orden</strong>. Para agilizar la
              resolución, sumá fotos o un video corto mostrando el inconveniente.
            </p>

            <div className="mt-5 rounded-2xl border border-[#00a650]/30 bg-[#00a650]/[0.08] p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#00a650]">
                El envío lo pagamos nosotros
              </p>
              <p className="mt-1.5">
                Music Importaciones cubre la logística cuando el error, el daño o la
                falla sea atribuible al producto o al envío. No vas a tener que pagar el
                flete por un problema que no causaste.
              </p>
            </div>

            <div className="mt-3 rounded-2xl border border-cyan/30 bg-cyan/[0.08] p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-cyan">
                Los 15 días no limitan tu garantía
              </p>
              <p className="mt-1.5">
                El plazo de cambio voluntario no limita tus derechos de garantía: si el
                producto tiene una falla de fabricación, la garantía sigue vigente
                durante todo su período aunque hayan pasado los 15 días.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink">Cambio voluntario</h2>
            <p className="mt-3">
              Si el producto está en perfecto estado pero querés cambiarlo, podés
              hacerlo dentro de los{" "}
              <strong className="text-ink">15 días corridos</strong> desde la entrega,
              siempre que esté:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 marker:text-violet">
              <li>Sin uso.</li>
              <li>Con su caja original.</li>
              <li>Con todos los accesorios y manuales.</li>
              <li>Con el embalaje original en perfecto estado.</li>
            </ul>
            <p className="mt-3">
              Cuando no hubo falla ni error en el pedido, el{" "}
              <strong className="text-ink">
                costo de envío del cambio corre por cuenta del comprador
              </strong>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink">Cómo es el proceso</h2>
            <ol className="mt-4 space-y-4">
              {PROCESO.map((paso, i) => (
                <li key={paso} className="flex gap-3">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet/20 text-xs font-bold tabular-nums text-violet"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span>{paso}</span>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-ink">Reembolsos</h2>
            <p className="mt-3">
              El reintegro se hace siempre por la misma vía en la que pagaste:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 marker:text-violet">
              <li>
                <strong className="text-ink">Transferencia bancaria:</strong> se
                devuelve a la cuenta desde la que se hizo el pago.
              </li>
              <li>
                <strong className="text-ink">Tarjeta de crédito o débito:</strong> se
                acredita como devolución en el resumen de la tarjeta, según los tiempos
                del banco emisor.
              </li>
            </ul>
            <p className="mt-3">
              Te avisamos cuando el reintegro queda procesado de nuestro lado.
            </p>
          </section>

          <div className="pt-2">
            <WhatsAppButton
              className="btn-whatsapp"
              message="Hola, quiero iniciar un cambio o una devolución. Mi número de orden es:"
            >
              Iniciar un cambio o devolución
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </div>
  );
}
