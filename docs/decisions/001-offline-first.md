# ADR-001: Offline-first para repartidores

**Status:** Accepted

## Context

El repartidor puede pasar horas sin Internet durante una ruta. El registro de una entrega no puede depender de una respuesta del servidor.

## Decision

La app móvil guarda la venta localmente en SQLite antes de imprimir o sincronizar. Una outbox conserva el trabajo pendiente.

## Alternatives considered

No hay alternativas históricas registradas en el repositorio.

## Consequences

- La captura sigue funcionando sin red.
- Hay que resolver persistencia, reintentos, conflictos e idempotencia.
- PostgreSQL solo es fuente central después de confirmación.
