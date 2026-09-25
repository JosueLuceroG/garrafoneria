# ADR-003: SQLite como almacenamiento móvil

**Status:** Accepted

## Context

La aplicación debe conservar catálogos y entregas durante horas sin Internet y recuperarse de cortes normales de conexión.

## Decision

La app móvil usa `expo-sqlite`. La Fase 1 crea tablas locales para clientes, productos, ventas, items y outbox.

## Alternatives considered

No hay alternativas registradas.

## Consequences

- Las transacciones locales son la unidad de durabilidad del flujo.
- El esquema local no tiene que ser una copia exacta del central, pero el mapeo futuro debe ser explícito.
- Se necesitarán migraciones locales antes de distribuir cambios con datos existentes.
