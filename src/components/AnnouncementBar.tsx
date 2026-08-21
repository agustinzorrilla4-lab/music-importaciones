import { Link } from "react-router-dom";

// Barra fija arriba de toda la tienda con la regla de envío completa.
export default function AnnouncementBar() {
  return (
    <div className="bg-deep text-center text-[13px] font-semibold leading-relaxed text-ink">
      <div className="container-page py-2.5">
        <span aria-hidden="true">🚚</span>{" "}
        <span className="font-bold text-cyan">ENVÍO GRATIS</span>{" "}
        <span className="text-ink-soft">·</span> Entrega en el día en{" "}
        <Link to="/envios" className="underline decoration-cyan/50 underline-offset-2 hover:text-cyan">
          zonas habilitadas
        </Link>{" "}
        comprando antes de las 12:00 <span className="text-ink-soft">·</span> A todo el
        país por Correo Argentino
      </div>
    </div>
  );
}
