import type { ReactNode } from "react";

interface InfoPageProps {
  eyebrow: string;
  title: string;
  children: ReactNode;
}

// Layout compartido para páginas institucionales, para mantener tipografía
// y espaciado consistentes con un único punto de edición.
export default function InfoPage({ eyebrow, title, children }: InfoPageProps) {
  return (
    <div className="container-page section animate-fade-in">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-1 text-2xl font-bold text-ink sm:text-3xl">{title}</h1>
        <div className="prose-content mt-6 space-y-4 text-sm leading-relaxed text-ink-soft">
          {children}
        </div>
      </div>
    </div>
  );
}
