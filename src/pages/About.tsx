import InfoPage from "@/components/InfoPage";
import WhatsAppButton from "@/components/WhatsAppButton";

const DATOS = [
  { dato: "2022", detalle: "Año de inicio" },
  { dato: "+900", detalle: "Operaciones concretadas" },
  { dato: "47", detalle: "Localidades con entrega en el día" },
];

export default function About() {
  return (
    <InfoPage
      eyebrow="La empresa"
      title="Somos fanáticos del sonido y de la calidad"
    >
      <p className="text-base">
        Por eso empezamos con JBL. JBL se dedica únicamente al sonido, y lo hace bien.
      </p>

      <p className="text-base">
        Nosotros nos dedicamos a elegir:{" "}
        <strong className="text-ink">
          el mejor producto, con las mejores características, al mejor precio
        </strong>
        .
      </p>

      <p className="text-base">
        Con el tiempo nos fuimos extendiendo a telefonía y electrónica. Cambió el
        catálogo, no el criterio: el fanatismo por la calidad es nuestro origen.
      </p>

      <p className="text-base">
        De cada producto publicamos el código de modelo exacto, la memoria física y el
        contenido de la caja. Lo que no podemos verificar, no lo publicamos.
      </p>

      <dl className="not-prose grid gap-3 pt-3 sm:grid-cols-3">
        {DATOS.map((d) => (
          <div key={d.dato} className="card p-4">
            <dt className="text-2xl font-extrabold tabular-nums text-cyan">{d.dato}</dt>
            <dd className="mt-0.5 text-sm text-ink-soft">{d.detalle}</dd>
          </div>
        ))}
      </dl>

      <p className="pt-2 text-sm text-ink-faint">
        Music Importaciones · CUIT 20-36826567-6 · Envíos a todo el país por Correo
        Argentino, Andreani y Vía Cargo.
      </p>

      <div className="pt-1">
        <WhatsAppButton className="btn-whatsapp" />
      </div>
    </InfoPage>
  );
}
