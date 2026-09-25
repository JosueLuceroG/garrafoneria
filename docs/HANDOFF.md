# Handoff

## Antes de continuar

Leer en este orden:

1. `README.md`.
2. `AGENTS.md`.
3. `docs/INDEX.md`.
4. `docs/PROJECT_CONTEXT.md`.
5. `docs/PRODUCT.md`.
6. `docs/BUSINESS_RULES.md`.
7. `docs/CURRENT_STATE.md`.
8. El documento específico del cambio.

## Objetivo actual

Completar la fundación documental de Garrafonería y dejar una transferencia reproducible. No avanzar todavía con Supabase remoto, Auth real, Bluetooth real ni cambios de arquitectura.

## Último trabajo realizado

- Se inspeccionó el repositorio completo.
- Se confirmó que Git está inicializado en `master` sin commits.
- Se confirmó el monorepo npm, el shell web, el demo móvil SQLite, el dominio, la migración y las pruebas.
- Se identificó que el mock de impresión sí se invoca después del guardado local.
- Se identificó que el folio del demo es provisional.
- Se documentaron las diferencias entre SQLite local y PostgreSQL central.

## Decisiones vigentes

- La venta se guarda localmente antes de imprimir.
- El UUID de venta es la identidad técnica.
- El folio visible no es una identidad ni una clave idempotente.
- SQLite es fuente operacional durante una ruta sin red.
- PostgreSQL será fuente central después de confirmar sincronización.
- La impresión depende de `PrinterService`.
- La separación por `business_id` y RLS forma parte del diseño desde el inicio.

## Archivos relevantes

- Dominio: `packages/domain/src/types.ts`, `sales.ts`, `folio.ts`, `printer.ts`.
- Tests: `packages/domain/src/sales.test.ts`, `folio.test.ts`.
- Flujo móvil: `apps/mobile/App.tsx`.
- SQLite: `apps/mobile/src/storage/database.ts`.
- Tipos de historial local: `apps/mobile/src/storage/types.ts`.
- Panel: `apps/admin-web/src/App.tsx`, `styles.css`.
- Esquema central: `supabase/migrations/202501240001_initial_schema.sql`.
- Reglas: `docs/BUSINESS_RULES.md`.

## Qué falta

- Sincronización remota idempotente.
- Auth y activación de dispositivos.
- Storage de firmas.
- Bluetooth ESC/POS.
- Reimpresión UI.
- Dashboard conectado.
- Folios seguros offline multi-dispositivo.

## Qué no hacer todavía

- No crear un proyecto Supabase remoto.
- No agregar credenciales reales.
- No implementar Auth real.
- No implementar Bluetooth nativo.
- No cambiar Expo, React Native, Vite, SQLite o Supabase sin ADR.
- No tratar el folio demo como seguro.
- No agregar mapas, tracking, reportes avanzados o inventario.

## Verificación

```bash
npm install
npm run typecheck
npm run typecheck --workspace @garrafoneria/mobile
npm run test
npm run lint
npm run format:check
npm run build
```

Resultado esperado: typecheck, tests, lint, formato y build del panel correctos; la auditoría de dependencias puede seguir reportando vulnerabilidades transitivas.

## Peligros conocidos

- Una venta local puede existir indefinidamente en `pending` porque no hay worker.
- Un folio timestamp-based puede colisionar entre dispositivos.
- No hay autenticación ni autorización ejecutable en las interfaces demo.
- La captura de firma actual es un trazo local, no una firma almacenada en nube.
- El GPS requiere permisos y puede no estar disponible.
- No usar `service_role` fuera del servidor futuro.

## NEXT EXACT STEP

Antes de iniciar Fase 2, convertir la estrategia de folios offline en una decisión explícita: documentar y aprobar un ADR que compare rangos reservados por ruta/dispositivo contra otra alternativa, sin implementarla todavía, y actualizar `BUSINESS_RULES.md`, `ROADMAP.md` y las pruebas esperadas con la decisión aprobada.
