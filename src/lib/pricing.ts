// ─────────────────────────────────────────────────────────────────────────
// CONDICIONES COMERCIALES — ÚNICO LUGAR PARA EDITAR
// ─────────────────────────────────────────────────────────────────────────

/** Descuento por pagar con transferencia bancaria. */
export const DESCUENTO_TRANSFERENCIA = 0.10;

/** Cuotas máximas habilitadas con tarjeta. */
export const CUOTAS_MAX = 3;

/**
 * Recargo total por financiar en CUOTAS_MAX cuotas.
 *
 * ⚠️ VALOR PROVISORIO. Reemplazar por la tasa real de Pago Nube una vez
 * configuradas las cuotas en el panel. Mientras tanto la ficha aclara que el
 * valor definitivo se confirma en el checkout.
 */
export const RECARGO_CUOTAS = 0.158;

/** IVA vigente, para mostrar el precio sin impuestos. */
export const IVA = 0.21;

export function precioTransferencia(precio: number): number {
  return Math.round(precio * (1 - DESCUENTO_TRANSFERENCIA));
}

export function precioSinImpuestos(precio: number): number {
  return Math.round(precio / (1 + IVA));
}

export interface PlanCuotas {
  cantidad: number;
  valorCuota: number;
  total: number;
}

export function planCuotas(precio: number): PlanCuotas {
  const total = Math.round(precio * (1 + RECARGO_CUOTAS));
  return {
    cantidad: CUOTAS_MAX,
    valorCuota: Math.round(total / CUOTAS_MAX),
    total,
  };
}
