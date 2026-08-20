import type { StockStatus } from "@/types";

const STOCK_LABEL: Record<StockStatus, string> = {
  in_stock: "En stock",
  limited: "Últimas unidades",
  out_of_stock: "Sin stock",
  on_request: "Consultar disponibilidad",
};

const STOCK_STYLE: Record<StockStatus, string> = {
  in_stock: "bg-lime text-deep",
  limited: "bg-amber text-deep",
  out_of_stock: "bg-white/10 text-ink-faint border border-white/10",
  on_request: "border border-cyan/40 bg-cyan/10 text-cyan",
};

export default function StockBadge({
  status,
  quantity,
}: {
  status: StockStatus;
  // Cuando se pasa, el texto muestra las unidades reales disponibles.
  quantity?: number;
}) {
  let label = STOCK_LABEL[status];

  if (quantity !== undefined && status !== "on_request") {
    if (quantity === 0) label = "Sin stock";
    else if (quantity === 1) label = "¡Última unidad disponible!";
    else if (quantity <= 5) label = `¡Últimas ${quantity} unidades!`;
    else label = `Stock disponible: ${quantity} unidades`;
  }

  return <span className={`badge ${STOCK_STYLE[status]}`}>{label}</span>;
}
