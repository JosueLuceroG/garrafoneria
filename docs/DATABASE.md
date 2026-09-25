# Base de datos

## Fuente central

Supabase PostgreSQL será la fuente central cuando la operación esté sincronizada. La migración inicial está en `supabase/migrations/202501240001_initial_schema.sql` y debe ejecutarse mediante Supabase CLI en un entorno real, no desde la app.

## Entidades iniciales

- `businesses`: tenant y configuración básica.
- `profiles`: identidad de Auth.
- `business_users`: pertenencia y rol por negocio.
- `devices`: dispositivos autorizados.
- `routes` y `route_assignments`: operación de reparto.
- `customers`, `products`, `customer_prices`: catálogo y precios.
- `sales`, `sale_items`, `payments`: nota y detalle económico.
- `delivery_proofs`: receptor, firma referenciada y GPS.
- `sync_events`: trazabilidad de recepción de payloads idempotentes.

La semántica y relaciones detalladas están en [`DATA_MODEL.md`](DATA_MODEL.md). Este documento conserva convenciones de persistencia y la relación con la migración.

## Convenciones

- UUID como PK de entidades de negocio.
- Dinero en `bigint` de centavos.
- Timestamps `timestamptz`.
- `business_id` en tablas de negocio.
- Índices para tenant, fecha, estado y sincronización.
- Soft delete solo en catálogos donde preservar historial sea útil; no borrar notas.

## Firmas

La firma binaria o archivo se almacenará en Supabase Storage. `delivery_proofs.signature_storage_path` será la referencia; no guardar el archivo grande en PostgreSQL.

## RLS actual

La migración habilita RLS y crea políticas de lectura por pertenencia al business mediante `is_business_member`. No hay políticas de escritura para que el cliente inserte libremente; la sincronización futura deberá usar una Edge Function o RPC que valide el payload. Las políticas no han sido ejecutadas en un proyecto remoto.

## Preguntas abiertas

- ¿Qué moneda y zona horaria se configurarán por negocio?
- ¿Se necesitan lotes o inventario para distinguir garrafones retornables?
- ¿Las unidades tienen depósito/envase vacío asociado a la venta?
