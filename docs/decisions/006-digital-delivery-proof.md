# ADR-006: Nota digital firmada como comprobante de entrega

**Status:** Accepted

## Context

El original físico firmado regresa a la garrafonería y es difícil de consultar o conservar.

## Decision

La venta debe conservar receptor, firma, fecha/hora, actor operativo y GPS opcional como nota digital firmada. Una nota firmada queda bloqueada; correcciones y cancelaciones futuras son auditables.

## Alternatives considered

No hay alternativas registradas.

## Consequences

- La firma es evidencia primaria.
- GPS es evidencia secundaria y no bloquea.
- SQLite conserva temporalmente el payload de firma.
- Storage y consulta central todavía no están implementados.
