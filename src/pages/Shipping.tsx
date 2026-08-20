import { useMemo, useState } from "react";
import DeliveryPromise from "@/components/DeliveryPromise";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SAME_DAY_LOCALITIES } from "@/data/shipping";
import { asset } from "@/lib/asset";

export default function Shipping() {
  const [query, setQuery] = useState("");
  const filteredLocalities = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("es-AR");
    if (!normalizedQuery) return SAME_DAY_LOCALITIES;
    return SAME_DAY_LOCALITIES.filter((locality) =>
      locality.toLocaleLowerCase("es-AR").includes(normalizedQuery)
    );
  }, [query]);

  return (
    <div className="container-page section animate-fade-in">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow">Logística</p>
        <h1 className="mt-1 text-2xl font-bold text-ink sm:text-3xl">Envíos</h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-soft">
          Ofrecemos envío gratis. En las zonas habilitadas de Buenos Aires, las compras realizadas de lunes a viernes antes de las 12:00 pueden llegar en el día. Para el resto del país despachamos a través de Correo Argentino.
        </p>

        <div className="mt-6 max-w-2xl">
          <DeliveryPromise />
        </div>

        <section className="mt-10" aria-labelledby="same-day-title">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Cobertura</p>
              <h2 id="same-day-title" className="mt-1 text-xl font-bold text-ink sm:text-2xl">
                Localidades con entrega en el día
              </h2>
            </div>
            <span className="w-fit rounded-full bg-[#00a650]/10 px-3 py-1 text-xs font-bold text-[#00a650]">
              Corte diario: 12:00
            </span>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-cyan/15 bg-panel shadow-soft">
            <div className="relative aspect-[1.85/1] overflow-hidden bg-[#d8f4ea]">
              <img
                src={asset("/shipping/cobertura-envios-en-el-dia.png")}
                alt="Mapa de cobertura de entregas en el día en Buenos Aires y alrededores"
                className="absolute max-w-none"
                style={{ width: "172.4%", left: "-66.8%", top: "-59.8%" }}
              />
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
            <div>
              <label htmlFor="locality-search" className="text-sm font-semibold text-ink">
                Buscá tu localidad
              </label>
              <input
                id="locality-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ej.: Berisso"
                className="input mt-2"
              />
              <p className="mt-3 text-xs leading-relaxed text-ink-faint">
                La cobertura se confirma con la dirección exacta antes de finalizar la compra.
              </p>
            </div>

            <div>
              {filteredLocalities.length > 0 ? (
                <ul className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredLocalities.map((locality) => (
                    <li
                      key={locality}
                      className="flex items-center gap-1.5 rounded-lg border border-cyan/10 bg-panel px-2.5 py-2 text-xs font-medium leading-tight text-ink"
                    >
                      <span className="text-[#00a650]" aria-hidden="true">✓</span>
                      {locality}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="rounded-2xl border border-dashed border-ink/15 p-5 text-sm text-ink-soft">
                  Esa localidad todavía no figura en el listado. Consultanos con tu dirección para verificar la cobertura.
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-violet/20 bg-panel p-6 sm:p-8">
          <h2 className="text-xl font-bold text-ink">Envíos al resto del país</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft">
            Despachamos por Correo Argentino a todo el país. El plazo depende del destino y se informa antes de confirmar la compra.
          </p>
          <WhatsAppButton
            className="btn-whatsapp mt-5"
            message="Hola, quiero consultar si mi dirección tiene entrega en el día."
          >
            Consultar mi dirección
          </WhatsAppButton>
        </section>
      </div>
    </div>
  );
}
