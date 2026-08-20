import EmptyState from "@/components/EmptyState";

export default function NotFound() {
  return (
    <div className="container-page section">
      <h1 className="sr-only">Página no encontrada</h1>
      <EmptyState
        icon="🧭"
        title="No encontramos esta página"
        description="El producto o la sección que buscás no está disponible."
        actionLabel="Volver al inicio"
        actionTo="/"
      />
    </div>
  );
}
