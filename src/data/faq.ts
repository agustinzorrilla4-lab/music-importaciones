export interface FaqItem {
  question: string;
  answer: string;
}

export const homeFaq: FaqItem[] = [
  {
    question: "¿Los productos son originales?",
    answer:
      "La procedencia, el contenido de caja y las condiciones de garantía se confirman para la unidad disponible antes de comprar.",
  },
  {
    question: "¿Cómo son los envíos?",
    answer:
      "El envío es gratis. En zonas habilitadas de Buenos Aires ofrecemos entrega en el día para compras realizadas antes de las 12:00; al resto del país despachamos por Correo Argentino.",
  },
  {
    question: "¿Qué medios de pago aceptan?",
    answer:
      "Los medios de pago y sus condiciones se informan junto con el precio vigente de cada unidad.",
  },
  {
    question: "¿Tienen atención personalizada?",
    answer:
      "Sí. Podés escribirnos por WhatsApp antes, durante y después de tu compra ante cualquier consulta.",
  },
];

export const fullFaq: FaqItem[] = [
  ...homeFaq,
  {
    question: "¿Puedo cambiar un producto si no me convence?",
    answer:
      "Antes de comprar te informamos las condiciones aplicables de cambios, devoluciones y garantía.",
  },
  {
    question: "¿Hacen factura?",
    answer: "Consultanos antes de comprar para confirmar el comprobante que corresponde a tu operación.",
  },
  {
    question: "¿Puedo retirar en persona?",
    answer:
      "Consultanos por WhatsApp para conocer las opciones disponibles para tu pedido.",
  },
];
