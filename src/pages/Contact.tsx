import { useState, type FormEvent } from "react";
import InfoPage from "@/components/InfoPage";
import WhatsAppButton from "@/components/WhatsAppButton";
import { whatsappLink } from "@/lib/format";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    window.open(
      whatsappLink(
        `Hola, soy ${name}. Mi email es ${email}. Quiero consultar: ${message}`
      ),
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <InfoPage eyebrow="Estamos para ayudarte" title="Contacto">
      <p>
        La forma más rápida de comunicarte con nosotros es por WhatsApp al
        11 5971-5328. También podés completar tu consulta acá abajo y la enviaremos
        directamente por WhatsApp.
      </p>
      <WhatsAppButton className="btn-whatsapp" />

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <input className="input" value={name} onChange={(event) => setName(event.target.value)} placeholder="Nombre" aria-label="Nombre" required />
        <input className="input" value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Email" aria-label="Email" required />
        <textarea
          className="input min-h-[120px]"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Tu consulta"
          aria-label="Tu consulta"
          required
        />
        <button type="submit" className="btn-primary">
          Enviar por WhatsApp
        </button>
      </form>
    </InfoPage>
  );
}
