import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ARGENTINA_TIME_ZONE = "America/Argentina/Buenos_Aires";
const CUTOFF_HOUR = 12;
const CUTOFF_SECONDS = CUTOFF_HOUR * 3600;
const DAY_SECONDS = 86400;

const WEEKDAY_LABELS = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
];

type DeliveryState = {
  // Segundos que faltan para el próximo corte de las 12:00 de un día hábil.
  secondsLeft: number;
  // Cómo se nombra el día de entrega: "HOY" o "el martes".
  deliveryLabel: string;
  // true cuando la entrega cae el mismo día (compra antes del corte en día hábil).
  sameDay: boolean;
};

function isWeekend(dow: number): boolean {
  return dow === 0 || dow === 6;
}

// Hora y día de la semana en Buenos Aires, sin depender del huso del visitante.
function getArgentinaNow(now: Date) {
  const parts = new Intl.DateTimeFormat("es-AR", {
    timeZone: ARGENTINA_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const v = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  const dow = new Date(
    Date.UTC(Number(v.year), Number(v.month) - 1, Number(v.day))
  ).getUTCDay();
  return {
    dow,
    secondsOfDay:
      Number(v.hour) * 3600 + Number(v.minute) * 60 + Number(v.second),
  };
}

function getDeliveryState(now = new Date()): DeliveryState {
  const { dow, secondsOfDay } = getArgentinaNow(now);

  // Día hábil y todavía no pasó el corte: se entrega hoy mismo.
  if (!isWeekend(dow) && secondsOfDay < CUTOFF_SECONDS) {
    return {
      secondsLeft: CUTOFF_SECONDS - secondsOfDay,
      deliveryLabel: "HOY",
      sameDay: true,
    };
  }

  // Ya pasó el corte (o es fin de semana): la entrega pasa al próximo día
  // hábil, y la cuenta regresiva apunta al corte de ese día.
  let daysAhead = 1;
  while (isWeekend((dow + daysAhead) % 7)) daysAhead += 1;

  return {
    secondsLeft:
      DAY_SECONDS - secondsOfDay + (daysAhead - 1) * DAY_SECONDS + CUTOFF_SECONDS,
    deliveryLabel: `el ${WEEKDAY_LABELS[(dow + daysAhead) % 7]}`,
    sameDay: false,
  };
}

function formatCountdown(totalSeconds: number): string {
  const s = Math.max(0, totalSeconds);
  const hh = Math.floor(s / 3600);
  const mm = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(hh)}:${pad(mm)}:${pad(ss)}`;
}

export default function DeliveryPromise({ compact = false }: { compact?: boolean }) {
  const [delivery, setDelivery] = useState<DeliveryState>(() => getDeliveryState());

  useEffect(() => {
    // Cada segundo, para que el reloj corra a la vista del comprador.
    const timer = window.setInterval(() => setDelivery(getDeliveryState()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const countdown = formatCountdown(delivery.secondsLeft);

  if (compact) {
    return (
      <div className="rounded-xl border border-[#00a650]/25 bg-[#00a650]/[0.07] p-2.5">
        <div className="flex items-start gap-2">
          <span className="shrink-0 text-base leading-none" aria-hidden="true">
            🚚
          </span>
          <div className="min-w-0 text-[11px] leading-snug text-ink-soft">
            <p aria-live="off">
              Comprá dentro de{" "}
              <time className="font-bold tabular-nums text-ink">{countdown}</time> y{" "}
              <span className="font-bold text-[#00a650]">
                lo recibís {delivery.deliveryLabel.toUpperCase()}
              </span>
            </p>
            <p className="mt-0.5 font-semibold text-[#00a650]">
              Envío gratis en zonas habilitadas
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#00a650]/25 bg-[#00a650]/[0.07] p-4">
      <div className="flex items-start gap-3">
        <span className="shrink-0 text-2xl leading-none" aria-hidden="true">
          🚚
        </span>
        <div>
          <p className="text-base leading-snug text-ink-soft" aria-live="off">
            Comprá dentro de{" "}
            <time className="text-lg font-extrabold tabular-nums text-ink">
              {countdown}
            </time>{" "}
            y{" "}
            <span className="font-extrabold text-[#00a650]">
              lo recibís {delivery.deliveryLabel.toUpperCase()}
            </span>
          </p>
          <p className="mt-1 text-sm font-bold text-[#00a650]">
            Envío gratis en el día en zonas habilitadas
          </p>
          <p className="mt-1 text-xs text-ink-soft">
            {delivery.sameDay
              ? "Entregas de lunes a viernes. El corte es a las 12:00 de Buenos Aires."
              : "Entregas de lunes a viernes. Hacé tu pedido ahora y lo despachamos el próximo día hábil."}
          </p>
          <Link
            to="/envios"
            className="mt-2 inline-block text-xs font-semibold text-violet hover:underline"
          >
            Ver localidades con entrega en el día
          </Link>
        </div>
      </div>
    </div>
  );
}
