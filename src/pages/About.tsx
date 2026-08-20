import InfoPage from "@/components/InfoPage";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function About() {
  return (
    <InfoPage eyebrow="Nuestra historia" title="Nosotros">
      <p>
        Music Importaciones es un negocio argentino dedicado a la venta e importación
        de tecnología, electrónica y productos seleccionados. Trabajamos con celulares,
        audio, aspiradoras y pequeños electrodomésticos elegidos uno por uno según
        calidad, utilidad real y respaldo posventa.
      </p>
      <p>
        Vendemos todos los días a través de Mercado Libre Argentina, nuestras redes y
        WhatsApp. Esa experiencia es la que sostiene esta tienda: sabemos qué pregunta
        el comprador antes de decidirse y qué necesita saber para comprar tranquilo.
      </p>
      <p>
        Priorizamos la atención personalizada. Antes de comprar te confirmamos modelo
        exacto, disponibilidad, forma de pago y envío por WhatsApp; después de la
        compra seguimos disponibles por el mismo canal para garantía o soporte.
      </p>
      <p>
        Publicamos únicamente especificaciones que podemos sostener. Si un dato depende
        de la versión o del modelo exacto de la unidad, lo aclaramos en la ficha en
        lugar de completarlo con información genérica.
      </p>
      <p>
        Hacemos envíos a todo el país por Correo Argentino y entregas en el día en
        zonas habilitadas del AMBA y La Plata, de lunes a viernes.
      </p>
      <div className="pt-2">
        <WhatsAppButton className="btn-whatsapp" />
      </div>
    </InfoPage>
  );
}
