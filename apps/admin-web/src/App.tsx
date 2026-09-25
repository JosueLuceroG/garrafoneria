import { useState } from "react";

const navigation = [
  "Dashboard",
  "Ventas",
  "Clientes",
  "Productos",
  "Rutas",
  "Repartidores",
  "Dispositivos",
];

export function App() {
  const [activeSection, setActiveSection] = useState("Dashboard");

  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <div className="brand-mark">
          <span className="brand-leaf">◒</span>
          <span>Garrafonería</span>
        </div>
        <p className="sidebar-label">Operación</p>
        <nav aria-label="Navegación principal">
          {navigation.map((item) => (
            <button
              className={
                item === activeSection ? "nav-item active" : "nav-item"
              }
              key={item}
              onClick={() => setActiveSection(item)}
              type="button"
            >
              <span className="nav-dot" />
              {item}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <p>Modo preparación</p>
          <span>Sin conexión a Supabase</span>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">Panel administrativo</p>
            <h1>{activeSection}</h1>
          </div>
          <div className="user-chip">
            <span className="avatar">AD</span>
            <span>Administrador demo</span>
          </div>
        </header>

        {activeSection === "Dashboard" ? (
          <Dashboard />
        ) : (
          <Placeholder section={activeSection} />
        )}
      </main>
    </div>
  );
}

function Dashboard() {
  return (
    <section className="dashboard" aria-label="Resumen del negocio">
      <div className="welcome-card">
        <div>
          <p className="eyebrow">Hoy, 24 de enero</p>
          <h2>La operación, clara de un vistazo.</h2>
          <p className="muted">
            Este panel está preparado para conectar ventas sincronizadas.
          </p>
        </div>
        <div className="water-symbol" aria-hidden="true">
          ◌
        </div>
      </div>
      <div className="metric-grid">
        <Metric
          label="Ventas del día"
          value="0"
          note="Aún sin datos sincronizados"
        />
        <Metric
          label="Garrafones entregados"
          value="0"
          note="Ruta local en preparación"
        />
        <Metric label="Notas pendientes" value="0" note="La cola está lista" />
        <Metric
          label="Estado de sincronización"
          value="Demo"
          note="Supabase no configurado"
        />
      </div>
      <div className="content-card">
        <div className="card-heading">
          <div>
            <p className="eyebrow">Actividad reciente</p>
            <h3>Ventas y entregas</h3>
          </div>
          <span className="status-pill">Preparado para offline-first</span>
        </div>
        <div className="empty-state">
          <div className="empty-icon">＋</div>
          <strong>No hay ventas sincronizadas</strong>
          <span>
            Las ventas creadas desde el móvil aparecerán aquí cuando el servidor
            confirme su sincronización.
          </span>
        </div>
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <article className="metric-card">
      <span className="metric-label">{label}</span>
      <strong>{value}</strong>
      <span className="metric-note">{note}</span>
    </article>
  );
}

function Placeholder({ section }: { section: string }) {
  return (
    <section className="content-card placeholder-card">
      <p className="eyebrow">Módulo base</p>
      <h2>{section}</h2>
      <p className="muted">
        La navegación está lista. Este módulo se conectará a Supabase en la
        siguiente fase.
      </p>
    </section>
  );
}
