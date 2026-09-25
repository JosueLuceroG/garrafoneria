# Garrafonería

Garrafonería es un sistema de reparto y administración para negocios de venta y distribución de garrafones. Sustituye la dependencia de notas físicas por una nota digital firmada, sin impedir el trabajo del repartidor cuando no hay Internet.

## Estado actual

La implementación está en **Fase 1.1: fundación documental y handoff**. La Fase 1 técnica dejó un demo local funcional, pero todavía no existe operación conectada.

- **IMPLEMENTADO:** monorepo, dominio, shell web, shell móvil, SQLite, venta local, receptor, firma local, GPS opcional, outbox y mock de impresión.
- **PARCIAL:** offline, evidencia, multi-tenant, folios y panel administrativo.
- **NO IMPLEMENTADO:** Supabase remoto, Auth real, sincronización real, Storage, Bluetooth y reimpresión UI.

El estado verificable completo está en [`docs/CURRENT_STATE.md`](docs/CURRENT_STATE.md). La instrucción para continuar está en [`docs/HANDOFF.md`](docs/HANDOFF.md).

## Componentes

- `apps/mobile`: app Android offline-first para repartidores.
- `apps/admin-web`: panel administrativo web para operar el negocio.
- `supabase`: migraciones PostgreSQL, configuración y futuras Edge Functions.
- `packages/domain`: reglas deterministas y tipos del dominio.
- `packages/shared`: contratos pequeños compartidos entre superficies.

## Requisitos

- Node.js 20 o superior.
- npm con soporte de workspaces; el repositorio se verificó con npm 11.19.1.
- Android Studio y un development build para ejecutar la app móvil.

## Instalación y comandos

```bash
npm install
npm run typecheck
npm run test
npm run lint
npm run format:check
npm run build
```

Para abrir las superficies:

```bash
npm run dev:admin
npm run dev:mobile
```

`npm run dev:mobile` inicia Expo; para Android nativo se requiere un development build y el entorno Android correspondiente.

Copiar `.env.example` a un archivo local cuando se prepare Supabase. No colocar secretos en Git ni en la APK.

## Decisiones importantes

- Los importes se representan en centavos enteros; no usar `number` decimal para dinero.
- Una venta se identifica por UUID y tiene un folio visible derivado de la ruta.
- La venta queda guardada localmente antes de cualquier impresión o sincronización.
- El backend será fuente central después de confirmar una sincronización idempotente.
- No se incluye Bluetooth, mapas, reportes avanzados ni autenticación remota real en esta fase.

## Documentación

Comenzar por [`docs/INDEX.md`](docs/INDEX.md). El orden recomendado es README, contexto, producto, reglas, arquitectura, estado actual y handoff.

- Producto y contexto: [`docs/PROJECT_CONTEXT.md`](docs/PROJECT_CONTEXT.md), [`docs/PRODUCT.md`](docs/PRODUCT.md).
- Reglas y flujos: [`docs/BUSINESS_RULES.md`](docs/BUSINESS_RULES.md), [`docs/USER_FLOWS.md`](docs/USER_FLOWS.md).
- Estado y continuidad: [`docs/CURRENT_STATE.md`](docs/CURRENT_STATE.md), [`docs/HANDOFF.md`](docs/HANDOFF.md).
- Técnica: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md), [`docs/DATA_MODEL.md`](docs/DATA_MODEL.md), [`docs/MOBILE_APP.md`](docs/MOBILE_APP.md).

Consultar `AGENTS.md` antes de modificar cualquier cosa.

## Siguiente paso

No comenzar Fase 2 todavía. El siguiente paso exacto es el indicado al final de [`docs/HANDOFF.md`](docs/HANDOFF.md): analizar y aprobar la estrategia de folios offline mediante un ADR, sin implementarla aún.
