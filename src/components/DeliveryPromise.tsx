import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ARGENTINA_TIME_ZONE = "America/Argentina/Buenos_Aires";
const CUTOFF_HOUR = 12;

type DeliveryState =
  // Día hábil antes del corte: llega hoy.
  | { kind: "same_day"; hours: number; minutes: number }
  // Día hábil después del corte, con próximo día hábil también hábil (ej. martes 15h → llega miércoles).
  | { kind: "next_business_day"; label: string }
  // Fin de semana o víspera de fin de semana (viernes tarde, sábado, domingo).
  // También cubre feriados si en el futuro se conecta un calendario.
  | { kind: "non_business_day"; label: string };

const WEEKDAY_LABELS = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
];

// Devuelve hora y día de la semana en Argentina.
function getArgentinaNow(now: Date) {
  const parts = new Intl.DateTimeFormat("es-AR", {
    timeZone: ARGENTINA_TIME_ZONE,
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const values = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  const y = Number(values.year);
  const m = Number(values.month);
  const d = Number(values.day);
  // Reconstruimos una Date UTC con los valores de Buenos Aires para calcular
  // el día de la semana sin depender del huso del cliente.
  const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay(); // 0 = domingo, 6 = sábado
  return {
    dow,
    hour: Number(values.hour),
    minute: Number(values.minute),
    second: Number(values.second),
  };
}

function labelForNextBusinessDay(dowToday: number): string {
  // Del día actual, salteamos sábado y domingo hasta encontrar un día hábil.
  let d = (dowToday + 1) % 7;
  while (d === 0 || d === 6) d = (d + 1) % 7;
  // Si es exactamente mañana, usamos "mañana"; si no, "el <día>".
  const isTomorrow = d === (dowToday + 1) % 7;
  return isTomorrow ? "mañana" : `el ${WEEKDAY_LABELS[d]}`;
}

function getDeliveryState(now = new Date()): DeliveryState {
  const { dow, hour, minute, second } = getArgentinaNow(now);
  const isWeekend = dow === 0 || dow === 6;

  if (isWeekend) {
    return {
      kind: "non_business_day",
      label: `el ${WEEKDAY_LABELS[1]}`, // "el lunes"
    };
  }

  const secondsUntilCutoff = (CUTOFF_HOUR - hour) * 3600 - minute * 60 - second;

  if (secondsUntilCutoff > 0) {
    const totalMinutes = Math.ceil(secondsUntilCutoff / 60);
    return {
      kind: "same_day",
      hours: Math.floor(totalMinutes / 60),
      minutes: totalMinutes % 60,
    };
  }

  return {
    kind: "next_business_day",
    label: labelForNextBusinessDay(dow),
  };
}

function primaryLine(state: DeliveryState): string {
  if (state.kind === "same_day") return "Llega hoy";
  return `Llega ${state.label}`;
}

export default function DeliveryPromise({ compact = false }: { compact?: boolean }) {
  const [delivery, setDelivery] = useState<DeliveryState>(() => getDeliveryState());

  useEffect(() => {
    const timer = window.setInterval(() => setDelivery(getDeliveryState()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const line1 = primaryLine(delivery);
  const countdown =
    delivery.kind === "same_day"
      ? `${delivery.hours} h ${String(delivery.minutes).padStart(2, "0")} min`
      : null;

  if (compact) {
    return (
      <div className="rounded-xl border border-[#00a650]/20 bg-[#00a650]/[0.06] px-3 py-2 text-xs">
        <p className="font-bold text-[#00a650]">Envío gratis</p>
        <p className="mt-0.5 font-semibold text-ink" aria-live="polite">
          {line1}
        </p>
        {countdown && (
          <p className="mt-0.5 text-ink-soft">
            Comprá dentro de <time>{countdown}</time>
          </p>
        )}
        {delivery.kind === "non_business_day" && (
          <p className="mt-0.5 text-ink-soft">
            Envíos de lunes a viernes.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#00a650]/25 bg-[#00a650]/[0.07] p-4">
      <div className="flex items-start gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00a650] text-lg text-white"
          aria-hidden="true"
        >
          ◷
        </span>
        <div>
          <p className="text-sm font-bold text-[#00a650]">Envío gratis</p>
          <p className="mt-0.5 text-base font-bold text-ink" aria-live="polite">
            {line1}
          </p>
          {delivery.kind === "same_day" && (
            <p className="mt-1 text-sm text-ink-soft">
              Comprá dentro de <time className="font-semibold text-ink">{countdown}</time> para recibirlo hoy en zonas habilitadas.
            </p>
          )}
          {delivery.kind === "next_business_day" && (
            <p className="mt-1 text-sm text-ink-soft">
              El corte de las 12:00 ya finalizó. Tu pedido llega el próximo día hábil en zonas habilitadas.
            </p>
          )}
          {delivery.kind === "non_business_day" && (
            <p className="mt-1 text-sm text-ink-soft">
              Los envíos se realizan de lunes a viernes. Podés hacer tu pedido ahora y lo despachamos el próximo día hábil.
            </p>
          )}
          <Link to="/envios" className="mt-2 inline-block text-xs font-semibold text-violet hover:underline">
            Ver localidades con entrega en el día
          </Link>
        </div>
      </div>
    </div>
  );
}
