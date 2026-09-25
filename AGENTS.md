# Garrafonería

Garrafonería es un sistema multi-tenant de reparto y administración para negocios de venta y distribución de garrafones. Tiene una app Android offline-first, un panel web y un backend Supabase/PostgreSQL.

## Reglas obligatorias

- Mantener TypeScript estricto, simplicidad y separación clara entre dominio, infraestructura e interfaces.
- El tenant se determina por `business_id`; nunca mezclar datos entre negocios. RLS es obligatorio en la nube.
- Guardar una venta localmente antes de imprimir. La impresión nunca puede ser la fuente de verdad.
- Una nota firmada queda bloqueada. Correcciones y cancelaciones deben ser acciones auditables.
- El UUID de la venta es la identidad técnica; el número visible es un folio legible por ruta. No asumir que un folio local es globalmente único sin confirmación del servidor.
- Crédito disponible no es dinero del negocio. No calcularlo como efectivo ni como ingreso.
- Las matemáticas críticas viven en funciones deterministas, sin depender de IA ni de la interfaz.
- No usar `service_role` en web ni móvil. Los secretos solo viven del lado servidor.
- No inventar requisitos. Lo indefinido debe registrarse como pregunta abierta en `docs/`.
- Antes de editar un módulo, leer su documentación y el código existente. Corregir la causa, hacer el cambio mínimo y no reestructurar sin motivo.
- Si cambia una regla, actualizar documentación, código y pruebas antes de cerrar la tarea.

## Antes de modificar

1. Leer `docs/INDEX.md`.
2. Leer `docs/CURRENT_STATE.md` y `docs/HANDOFF.md`.
3. Leer la documentación específica del módulo.
4. Inspeccionar la implementación real y sus pruebas.
5. Confirmar que el cambio pertenece a la fase actual.

## Después de modificar

1. Ejecutar typecheck, tests, lint, formato y build aplicables.
2. Actualizar la documentación afectada.
3. Actualizar `docs/CURRENT_STATE.md`.
4. Actualizar `docs/HANDOFF.md` con el siguiente paso exacto.
5. Actualizar `CHANGELOG.md` cuando el cambio sea relevante.

## Límites de fase

- No iniciar Fase 2 sin decisión explícita y documentación actualizada.
- No crear Supabase remoto, Auth real o Bluetooth real durante Fase 1.1.
- No introducir secretos ni `service_role` en web o móvil.
- No saltar la abstracción `PrinterService`.
- No asumir Internet disponible en la app móvil.
- No tratar el folio provisional como seguro para producción.

La documentación es parte del Definition of Done: ninguna fase importante termina hasta que código, tests, `CURRENT_STATE`, `HANDOFF`, `ROADMAP` y documentación técnica afectada estén sincronizados.

## Mapa de consulta

- Entrada y handoff: `docs/INDEX.md`, `docs/CURRENT_STATE.md`, `docs/HANDOFF.md`.
- Producto y alcance: `docs/PROJECT_CONTEXT.md`, `docs/PRODUCT.md`, `docs/ROADMAP.md`.
- Reglas y flujos: `docs/BUSINESS_RULES.md`, `docs/USER_FLOWS.md`.
- Arquitectura: `docs/ARCHITECTURE.md`.
- Móvil e impresión: `docs/MOBILE_APP.md`, `docs/MOBILE_OFFLINE.md`, `docs/PRINTING.md`, `docs/GPS.md`.
- Offline y sincronización: `docs/SYNC_PROTOCOL.md`.
- Datos y migraciones: `docs/DATABASE.md`, `docs/DATA_MODEL.md`, `supabase/migrations/`.
- Web y nube: `docs/ADMIN_WEB.md`, `docs/SUPABASE.md`.
- Seguridad: `docs/SECURITY.md`, `docs/DEVICE_ACTIVATION.md`.
- Reglas y pruebas críticas: `packages/domain/src/`, `docs/ARCHITECTURE.md`.

No marcar una tarea como terminada si documentación, implementación y pruebas no coinciden.
