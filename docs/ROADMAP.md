# Roadmap

## Fase 1: base local y arquitectura — COMPLETADA

- Monorepo TypeScript estricto.
- Shell web y móvil.
- Dominio compartido y pruebas de cálculos/folios.
- SQLite con venta local, firma, GPS opcional y outbox.
- Migración PostgreSQL multi-tenant con RLS.
- PrinterService mock.

## Fase 1.1: fundación documental y handoff — COMPLETADA

- Índice, contexto, estado actual y handoff.
- Reglas de negocio y flujos documentados.
- ADRs de decisiones vigentes.
- Estado real de cada componente y riesgo conocido.
- No incluye cambios de backend remoto ni nuevas funcionalidades.

## Fase 2: operación conectada — NO INICIADA

- Supabase Auth real.
- Activación/autorización de dispositivos.
- Descarga de clientes, productos, rutas y precios.
- Worker de sincronización idempotente.
- Storage para firmas.
- Historial y detalle de notas en panel.

## Fase 3: operación completa — PLANEADA

- Adaptador Bluetooth ESC/POS para development build.
- Reimpresión y estado de impresora.
- Dashboard conectado, filtros y reportes básicos.
- Mapa de entregas y GPS histórico.
- Gestión de precios especiales, repartidores y dispositivos.

## Después

- Inventario y retornables si el negocio lo requiere.
- Android tablet con layout adaptado.
- Reportes avanzados, notificaciones y automatizaciones.
- No comprometer estas funciones en el MVP sin una decisión de producto.
