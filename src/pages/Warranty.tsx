import InfoPage from "@/components/InfoPage";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Warranty() {
  return (
    <InfoPage eyebrow="Respaldo" title="Garantía y cambios">
      <p>
        Acá está el detalle exacto de qué cubre cada cobertura, quién responde y cómo
        se hace un reclamo. Si algo no está listado, preguntanos antes de comprar.
      </p>

      <h2 className="pt-2 text-lg font-bold text-ink">Plazos por tipo de producto</h2>
      <div className="not-prose overflow-x-auto pt-1">
        <table className="w-full min-w-[420px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-ink/15 text-left">
              <th className="py-2 pr-4 font-semibold text-ink">Producto</th>
              <th className="py-2 font-semibold text-ink">Garantía</th>
            </tr>
          </thead>
          <tbody className="text-ink-soft">
            <tr className="border-b border-ink/10">
              <td className="py-2 pr-4">Celulares</td>
              <td className="py-2 font-semibold text-ink">12 meses</td>
            </tr>
            <tr className="border-b border-ink/10">
              <td className="py-2 pr-4">Parlantes y audio</td>
              <td className="py-2 font-semibold text-ink">12 meses</td>
            </tr>
            <tr className="border-b border-ink/10">
              <td className="py-2 pr-4">Aspiradoras y licuadoras</td>
              <td className="py-2 font-semibold text-ink">6 meses</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">Cargadores y accesorios</td>
              <td className="py-2 font-semibold text-ink">3 meses</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm">
        El plazo corre desde la fecha de entrega y figura en la ficha de cada producto.
      </p>

      <h2 className="pt-2 text-lg font-bold text-ink">Qué cubre</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>Fallas de fabricación que aparecen con el uso normal del producto.</li>
        <li>
          Componentes que dejan de funcionar sin que haya habido golpe, mojadura ni
          intervención de terceros.
        </li>
        <li>
          Productos que llegan con una falla de origen o que no funcionan desde el
          primer uso.
        </li>
      </ul>

      <h2 className="pt-2 text-lg font-bold text-ink">Qué no cubre</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>Daño por golpe, caída, humedad o líquidos.</li>
        <li>Uso distinto al indicado por el fabricante o conexión a voltaje incorrecto.</li>
        <li>
          Equipos abiertos, reparados o modificados por un tercero, o con el sello de
          seguridad roto.
        </li>
        <li>Desgaste normal por uso y accesorios consumibles (filtros, fundas, cables).</li>
        <li>Desgaste habitual de la batería por ciclos de carga.</li>
        <li>Problemas de software, configuración o bloqueo por cuenta del usuario.</li>
      </ul>

      <h2 className="pt-2 text-lg font-bold text-ink">Quién responde</h2>
      <p>
        Music Importaciones gestiona el reclamo de punta a punta: sos vos y nosotros, no
        tenés que perseguir a un tercero. Según el producto lo resolvemos directamente o
        lo derivamos al servicio técnico del fabricante o del importador, y en ese caso
        te informamos cuál es y cuánto demora antes de que dejes el equipo.
      </p>
      <p>
        Esta cobertura es adicional a la garantía legal que la Ley 24.240 de Defensa del
        Consumidor establece para productos nuevos en Argentina.
      </p>

      <h2 className="pt-2 text-lg font-bold text-ink">Compra protegida: 30 días</h2>
      <p>Durante los primeros 30 días desde la entrega te cubrimos si:</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>El producto no llega.</li>
        <li>Llega distinto a lo publicado (otro modelo, otra capacidad, otro color).</li>
        <li>Llega dañado o incompleto.</li>
        <li>Llega con una falla de fábrica.</li>
      </ul>
      <p>
        En esos casos elegís vos: cambio por una unidad igual, o devolución del importe
        pagado. El costo del envío de la devolución lo cubrimos nosotros cuando el
        problema es atribuible a Music Importaciones.
      </p>
      <p>
        Es un compromiso comercial de Music Importaciones. Es independiente del derecho
        de arrepentimiento de 10 días corridos que la ley te da en compras a distancia.
      </p>

      <h2 className="pt-2 text-lg font-bold text-ink">Cómo hacer un reclamo</h2>
      <ol className="list-decimal space-y-2 pl-5">
        <li>Escribinos por WhatsApp al 11 5971-5328 dentro del plazo de cobertura.</li>
        <li>
          Contanos qué pasa y mandanos fotos o un video corto mostrando la falla. Con
          eso resolvemos la mayoría de los casos sin que muevas el equipo.
        </li>
        <li>
          Tené a mano el comprobante de compra y, si lo conservás, la caja y los
          accesorios.
        </li>
        <li>Te damos una respuesta con los pasos concretos y los plazos estimados.</li>
      </ol>

      <h2 className="pt-2 text-lg font-bold text-ink">Cambios por otro motivo</h2>
      <p>
        Si querés cambiar un producto sin que tenga falla, escribinos dentro de los 10
        días de recibido. Tiene que estar sin uso, en su caja y con todos los
        accesorios. Coordinamos el cambio o la devolución según disponibilidad.
      </p>

      <div className="pt-2">
        <WhatsAppButton
          className="btn-whatsapp"
          message="Hola, quiero hacer una consulta sobre la garantía de un producto."
        >
          Consultar por garantía
        </WhatsAppButton>
      </div>
    </InfoPage>
  );
}
