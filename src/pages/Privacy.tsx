import InfoPage from "@/components/InfoPage";

export default function Privacy() {
  return (
    <InfoPage eyebrow="Legal" title="Política de privacidad">
      <p>
        Este texto es un borrador de referencia — reemplazalo por una política de
        privacidad redactada o revisada por un profesional antes de publicar la
        tienda.
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Qué datos personales recolectamos (nombre, email, dirección, etc.).</li>
        <li>Para qué se usan (procesar compras, enviar comunicaciones, soporte).</li>
        <li>Con quién se comparten (transportistas, procesadores de pago).</li>
        <li>Cómo el usuario puede solicitar la baja o corrección de sus datos.</li>
      </ul>
    </InfoPage>
  );
}
