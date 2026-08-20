import InfoPage from "@/components/InfoPage";

export default function Account() {
  return (
    <InfoPage eyebrow="Tu espacio" title="Mi cuenta">
      <p>
        El sistema de cuentas (registro, login e historial de pedidos) se integrará en
        una próxima etapa. Por ahora, este es un placeholder de la sección.
      </p>
      <form className="mt-4 space-y-3">
        <input className="input" type="email" placeholder="Email" aria-label="Email" autoComplete="email" />
        <input
          className="input"
          type="password"
          placeholder="Contraseña"
          aria-label="Contraseña"
          autoComplete="current-password"
        />
        <button type="button" className="btn-primary">
          Ingresar
        </button>
      </form>
    </InfoPage>
  );
}
