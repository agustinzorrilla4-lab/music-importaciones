export function formatPrice(value: number): string {
  // Formato pedido explícitamente por la marca: "$ 250.000" (con espacio
  // después del símbolo y punto de miles en formato argentino).
  return `$ ${Math.round(value).toLocaleString("es-AR")}`;
}

// WhatsApp comercial de Music Importaciones.
// 11 5971-5328 en formato internacional para enlaces wa.me de Argentina.
const BUSINESS_WHATSAPP =
  import.meta.env.VITE_WHATSAPP_PHONE?.replace(/\D/g, "") || "5491159715328";

export function whatsappLink(message: string, phone = BUSINESS_WHATSAPP): string {
  const text = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${text}`;
}
