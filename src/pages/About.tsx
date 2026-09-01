import InfoPage from "@/components/InfoPage";
import WhatsAppButton from "@/components/WhatsAppButton";

const DATOS = [
  { dato: "2022", detalle: "Año de inicio de actividad" },
  { dato: "+900", detalle: "Operaciones concretadas" },
  { dato: "47", detalle: "Localidades con entrega en el día" },
];

const COMPROMISOS = [
  {
    titulo: "Precisión en la información",
    texto:
      "Publicamos el código de modelo, la memoria física y el contenido de la caja de cada producto. Cuando una especificación depende de la versión o del mercado de origen, lo indicamos expresamente en lugar de completarla con información genérica.",
  },
  {
    titulo: "Selección por especialización",
    texto:
      "Trabajamos con fabricantes que concentran su desarrollo en una categoría determinada. Preferimos un catálogo acotado y verificado antes que una oferta amplia que no podamos respaldar.",
  },
  {
    titulo: "Trazabilidad de la operación",
    texto:
      "Toda compra se cursa por la tienda, con comprobante, medio de pago registrado y seguimiento de envío. No operamos con pagos fuera del proceso de compra.",
  },
  {
    titulo: "Respaldo posventa",
    texto:
      "Gestionamos las garantías de forma directa: 12 meses en telefonía y audio, 6 meses en electrodomésticos y 3 meses en accesorios, con compra protegida de 30 días en todos los casos.",
  },
];

export default function About() {
  return (
    <InfoPage eyebrow="La empresa" title="Quiénes somos">
      <p>
        Music Importaciones es una empresa argentina dedicada a la importación y
        comercialización de audio, telefonía y electrónica de consumo.
      </p>

      <p>
        Iniciamos nuestra actividad en <strong className="text-ink">2022</strong> con la
        importación de equipos de sonido y barras JBL. La elección respondió a un
        criterio que mantenemos hasta hoy: priorizar fabricantes especializados, que
        concentran su desarrollo en una categoría y sostienen un estándar de calidad
        verificable en ella.
      </p>

      <p>
        Posteriormente incorporamos telefonía móvil y electrónica de consumo, aplicando
        el mismo criterio de selección. El audio continúa siendo parte de nuestro
        catálogo y del origen de la marca.
      </p>

      <p>
        A la fecha acumulamos{" "}
        <strong className="text-ink">más de 900 operaciones concretadas</strong> en
        canales de venta online.
      </p>

      <dl className="not-prose grid gap-3 pt-2 sm:grid-cols-3">
        {DATOS.map((d) => (
          <div key={d.dato} className="card p-4">
            <dt className="text-2xl font-extrabold tabular-nums text-cyan">{d.dato}</dt>
            <dd className="mt-0.5 text-sm text-ink-soft">{d.detalle}</dd>
          </div>
        ))}
      </dl>

      <h2 className="pt-4 text-xl font-bold text-ink">Nuestro compromiso</h2>

      <div className="not-prose grid gap-3 pt-1 sm:grid-cols-2">
        {COMPROMISOS.map((c) => (
          <div key={c.titulo} className="card p-5">
            <h3 className="text-base font-semibold text-ink">{c.titulo}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{c.texto}</p>
          </div>
        ))}
      </div>

      <h2 className="pt-4 text-xl font-bold text-ink">Logística</h2>

      <p>
        Realizamos entregas en el día en 47 localidades del AMBA y La Plata, de lunes a
        viernes, para pedidos confirmados antes de las 12:00. Al resto del país
        despachamos mediante Correo Argentino, Andreani y Vía Cargo.
      </p>

      <h2 className="pt-4 text-xl font-bold text-ink">Atención</h2>

      <p>
        Atendemos por WhatsApp antes y después de la compra: confirmación de modelo y
        disponibilidad, seguimiento del envío y gestión de garantía. Music Importaciones
        opera bajo CUIT 20-36826567-6.
      </p>

      <div className="pt-2">
        <WhatsAppButton className="btn-whatsapp" />
      </div>
    </InfoPage>
  );
}
