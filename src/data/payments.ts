// ─────────────────────────────────────────────────────────────────────────
// MEDIOS DE PAGO — ÚNICO LUGAR PARA EDITAR
//
// Poné `enabled: false` en lo que NO aceptes y se deja de mostrar solo.
// No agregues cuotas, bancos ni promociones que no estén vigentes.
//
// PENDIENTE DE CONFIRMACIÓN DEL DUEÑO: los tres métodos de abajo están
// marcados según la operación habitual del negocio (ventas por WhatsApp y
// Mercado Libre). Confirmar o corregir antes de considerarlo definitivo.
// ─────────────────────────────────────────────────────────────────────────

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  detail: string;
  /** Ventaja concreta; se muestra resaltada. Dejar vacío si no aplica. */
  highlight?: string;
  enabled: boolean;
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: "transferencia",
    name: "Transferencia bancaria",
    icon: "🏦",
    detail:
      "Te pasamos los datos de la cuenta por WhatsApp. Confirmamos el pedido apenas se acredita.",
    highlight: "Sin recargo",
    enabled: true,
  },
  {
    id: "efectivo",
    name: "Efectivo en la entrega",
    icon: "💵",
    detail:
      "Disponible en las zonas con entrega en el día. Pagás cuando recibís el producto y lo revisás.",
    highlight: "Pagás al recibir",
    enabled: true,
  },
  {
    id: "mercado-pago",
    name: "Mercado Pago",
    icon: "💳",
    detail:
      "Te enviamos un link de pago para abonar con tarjeta de débito, crédito o dinero en cuenta.",
    enabled: true,
  },
];

// Condiciones de financiación. Mantener en null mientras no haya una promoción
// vigente y confirmada: no publicamos cuotas sin validarlas.
export const installmentsNote: string | null = null;

// Comprobante que se entrega con la compra.
// PENDIENTE DE CONFIRMACIÓN: definir si se emite factura A, B o comprobante simple.
export const invoiceNote: string | null = null;
