import InfoPage from "@/components/InfoPage";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  paymentMethods,
  installmentsNote,
  invoiceNote,
} from "@/data/payments";

export default function Payments() {
  const methods = paymentMethods.filter((m) => m.enabled);

  return (
    <InfoPage eyebrow="Medios de pago" title="Pagos">
      <p>
        Estas son las formas de pago que aceptamos. Coordinamos el pago por WhatsApp
        junto con el envío, antes de que confirmes la compra.
      </p>

      <div className="not-prose grid gap-3 pt-2 sm:grid-cols-2">
        {methods.map((method) => (
          <div key={method.id} className="card p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl leading-none" aria-hidden="true">
                {method.icon}
              </span>
              <div>
                <p className="text-sm font-bold text-ink">{method.name}</p>
                {method.highlight && (
                  <p className="mt-0.5 text-xs font-bold text-[#00a650]">
                    {method.highlight}
                  </p>
                )}
                <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                  {method.detail}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="pt-4 text-lg font-bold text-ink">Cuotas</h2>
      <p>
        {installmentsNote ??
          "Cuando haya una promoción de cuotas vigente la vas a ver publicada acá y en la ficha del producto. No publicamos financiación que no esté confirmada, así no te encontrás con otra condición al momento de pagar."}
      </p>

      <h2 className="pt-2 text-lg font-bold text-ink">Comprobante</h2>
      <p>
        {invoiceNote ??
          "Consultanos por WhatsApp qué comprobante necesitás y te confirmamos antes de cerrar la operación."}
      </p>

      <h2 className="pt-2 text-lg font-bold text-ink">Cómo se coordina</h2>
      <ol className="list-decimal space-y-2 pl-5">
        <li>Armás el pedido y nos lo enviás por WhatsApp.</li>
        <li>Te confirmamos disponibilidad, precio final y forma de envío.</li>
        <li>Elegís el medio de pago y te pasamos los datos o el link.</li>
        <li>Con el pago acreditado (o acordado el pago contra entrega) despachamos.</li>
      </ol>

      <div className="pt-2">
        <WhatsAppButton
          className="btn-whatsapp"
          message="Hola, quiero consultar las formas de pago disponibles."
        >
          Consultar formas de pago
        </WhatsAppButton>
      </div>
    </InfoPage>
  );
}
