import InfoPage from "@/components/InfoPage";
import WhatsAppButton from "@/components/WhatsAppButton";

const HITOS = [
  { dato: "2022", detalle: "Arrancamos con audio" },
  { dato: "+900", detalle: "Ventas online desde entonces" },
  { dato: "47", detalle: "Localidades con entrega en el día" },
];

export default function About() {
  return (
    <InfoPage eyebrow="Nuestra historia" title="De los parlantes a los celulares">
      <p>
        Music Importaciones arrancó en <strong className="text-ink">2022</strong>{" "}
        trayendo equipos de sonido y barras JBL.
      </p>

      <p>
        Elegimos JBL por una razón simple: es una marca que se dedica{" "}
        <strong className="text-ink">solo al sonido</strong>. No hace de todo. Hace una
        cosa y la hace bien. Esa idea —especializarse en lugar de abarcar— es la que
        seguimos usando hoy para decidir qué traemos y qué no.
      </p>

      <p>
        Con el tiempo el negocio nos mostró algo: los equipos de sonido ocupan muchísimo
        lugar. Un parlante grande deja la misma ganancia que un celular, pero te come el
        depósito. Así que hace dos años empezamos con celulares: misma rentabilidad,
        mucho menos espacio y un producto que la gente busca todos los días.
      </p>

      <p>
        Hoy traemos celulares, audio y electrónica seleccionada. Llevamos{" "}
        <strong className="text-ink">más de 900 ventas online desde 2022</strong>.
      </p>

      <p>
        El nombre quedó de aquel principio. No lo cambiamos porque es de donde venimos.
      </p>

      {/* Los tres números que sostienen la historia. */}
      <dl className="not-prose grid gap-3 pt-2 sm:grid-cols-3">
        {HITOS.map((h) => (
          <div key={h.dato} className="card p-4">
            <dt className="text-2xl font-extrabold tabular-nums text-cyan">{h.dato}</dt>
            <dd className="mt-0.5 text-sm text-ink-soft">{h.detalle}</dd>
          </div>
        ))}
      </dl>

      <h2 className="pt-4 text-xl font-bold text-ink">Cómo trabajamos</h2>

      <p>
        <strong className="text-ink">Te decimos el modelo exacto.</strong> Publicamos el
        código de modelo, la RAM física y qué incluye la caja. Si un dato depende de la
        versión o del mercado, lo aclaramos en la ficha en lugar de completarlo con
        información genérica.
      </p>

      <p>
        <strong className="text-ink">No inventamos especificaciones.</strong> Preferimos
        decir "consultanos" antes que publicar una potencia, una autonomía o una
        certificación que no podemos sostener.
      </p>

      <p>
        <strong className="text-ink">Estamos antes y después de la venta.</strong>{" "}
        Respondemos por WhatsApp para confirmar disponibilidad y forma de pago antes de
        comprar, y para garantía o soporte después.
      </p>

      <p>
        <strong className="text-ink">Entregamos rápido.</strong> Envío en el día en zonas
        habilitadas del AMBA y La Plata de lunes a viernes, y a todo el país por Correo
        Argentino, Andreani y Vía Cargo.
      </p>

      <div className="pt-2">
        <WhatsAppButton className="btn-whatsapp" />
      </div>
    </InfoPage>
  );
}
