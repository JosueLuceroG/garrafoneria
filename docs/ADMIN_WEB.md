# Panel administrativo web

## Propósito

El administrador o dueño utilizará un navegador en laptop. El panel debe sentirse como una aplicación administrativa de escritorio con sidebar, tablas, filtros y detalle; no como una versión grande del móvil.

## Implementación actual

- Entrada: `apps/admin-web/src/main.tsx`.
- Shell y estado de navegación: `apps/admin-web/src/App.tsx`.
- Estilos: `apps/admin-web/src/styles.css`.
- Configuración: `apps/admin-web/vite.config.ts`.
- Dependencias: React 18, React DOM, Vite y plugin React.

La navegación actual tiene `Dashboard`, `Ventas`, `Clientes`, `Productos`, `Rutas`, `Repartidores` y `Dispositivos`. Dashboard muestra métricas cero y textos demo. Los demás módulos muestran placeholders. No existe login ni cliente Supabase.

## Módulos de producto

Planeados:

- Dashboard;
- Ventas y notas;
- Clientes;
- Productos;
- Precios generales y especiales;
- Rutas;
- Repartidores;
- Dispositivos;
- Firmas y evidencias;
- Mapas;
- Reportes;
- Configuración.

La lista no implica que todos formen parte del MVP conectado.

## Datos y límites

El panel no consulta SQLite del teléfono ni se conecta a la app móvil. En una fase posterior consultará Supabase mediante el cliente público y RLS, o funciones servidor cuando la operación requiera validación privilegiada.

## Estados

- **IMPLEMENTADO:** shell, navegación y build.
- **PROVISIONAL:** contenido demo y fecha mostrada en Dashboard.
- **NO IMPLEMENTADO:** Auth, tablas reales, detalle de nota, firmas, GPS, mapas y reportes.
