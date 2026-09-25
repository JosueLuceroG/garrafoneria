# ADR-007: Multi-tenant desde el inicio

**Status:** Accepted

## Context

El sistema empieza con una garrafonería, pero la arquitectura no debe mezclar información si se incorporan más negocios.

## Decision

Las entidades de negocio usan `business_id`; PostgreSQL aplica RLS y FK compuestos donde corresponde. La identidad de negocio no se infiere solo de datos enviados por la interfaz.

## Alternatives considered

No hay alternativas documentadas.

## Consequences

- Hay más constraints e índices desde el inicio.
- Toda operación futura debe validar pertenencia.
- El demo usa un business fijo, por lo que multi-tenant todavía no está ejercitable en UI.
