import InfoPage from "@/components/InfoPage";
import { whatsappLink } from "@/lib/format";

export default function Privacy() {
  return (
    <InfoPage eyebrow="Legal" title="Política de privacidad">
      <p>
        Esta política describe cómo tratamos tu información en este sitio de Music
        Importaciones.
      </p>

      <h2 className="pt-2 text-lg font-bold text-ink">Qué datos recolectamos</h2>
      <p>
        Este sitio no tiene cuentas de usuario ni formularios que envíen tus datos a un
        servidor nuestro. No pedimos ni almacenamos datos de tarjetas.
      </p>
      <p>
        Cuando armás un pedido, los datos que completás (nombre, localidad y código
        postal) se usan únicamente para redactar el mensaje que se abre en tu WhatsApp.
        Sos vos quien decide enviarlo. Si no lo enviás, esa información no llega a
        ningún lado.
      </p>

      <h2 className="pt-2 text-lg font-bold text-ink">Datos guardados en tu navegador</h2>
      <p>
        El carrito y los favoritos se guardan localmente en tu propio dispositivo
        (almacenamiento del navegador) para que no pierdas la selección al recargar la
        página. Esa información no se envía a Music Importaciones ni a terceros, y
        podés borrarla vaciando el carrito o limpiando los datos del sitio desde tu
        navegador.
      </p>

      <h2 className="pt-2 text-lg font-bold text-ink">Cuando nos escribís</h2>
      <p>
        Al contactarnos por WhatsApp, la conversación queda sujeta a las condiciones de
        WhatsApp. Usamos los datos que nos compartís exclusivamente para responder tu
        consulta, coordinar el envío y dar soporte posventa. No los vendemos ni los
        cedemos con fines publicitarios.
      </p>
      <p>
        Para concretar una entrega compartimos con el transportista únicamente los
        datos necesarios para el despacho: nombre, dirección, localidad, código postal
        y teléfono de contacto.
      </p>

      <h2 className="pt-2 text-lg font-bold text-ink">Servicios de terceros</h2>
      <p>
        Este sitio carga la tipografía Poppins desde Google Fonts, por lo que tu
        navegador realiza una solicitud a los servidores de Google al abrir la página.
        No usamos herramientas de analítica ni píxeles de seguimiento publicitario.
      </p>

      <h2 className="pt-2 text-lg font-bold text-ink">Tus derechos</h2>
      <p>
        Podés pedirnos acceso, corrección o eliminación de los datos personales que nos
        hayas compartido escribiéndonos por WhatsApp al{" "}
        <a
          href={whatsappLink("Hola, quiero hacer una consulta sobre mis datos personales.")}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-violet hover:underline"
        >
          11 5971-5328
        </a>
        .
      </p>
      <p className="text-sm text-ink-soft">
        Última actualización: agosto de 2026.
      </p>
    </InfoPage>
  );
}
