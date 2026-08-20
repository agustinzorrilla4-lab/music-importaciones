import InfoPage from "@/components/InfoPage";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function About() {
  return (
    <InfoPage eyebrow="Nuestra historia" title="Nosotros">
      <p>
        Music Importaciones nace con un objetivo simple: acercarte tecnología
        seleccionada, con precios competitivos y sin las dudas típicas de comprar
        online. Elegimos cada producto pensando en calidad, utilidad real y respaldo.
      </p>
      <p>
        Creemos que comprar tecnología no tiene por qué ser complicado. Por eso
        priorizamos la atención personalizada: estamos disponibles por WhatsApp antes,
        durante y después de tu compra para resolver cualquier duda.
      </p>
      <p>
        Este texto es un punto de partida editable — te recomendamos sumar la historia
        real de la marca, años en el mercado, valores y cualquier dato verificable que
        refuerce la confianza del comprador.
      </p>
      <div className="pt-2">
        <WhatsAppButton className="btn-whatsapp" />
      </div>
    </InfoPage>
  );
}
