# Architecture Decision Records

Los ADR registran decisiones que afectan arquitectura o comportamiento y que no deben cambiarse casualmente. Un ADR no reemplaza la documentación operativa: `CURRENT_STATE.md` indica si la decisión está implementada.

## Convención

- `Status`: `Accepted`, `Proposed` o `Superseded`.
- `Context`: problema que motivó la decisión.
- `Decision`: decisión vigente.
- `Alternatives considered`: solo alternativas conocidas; no inventar deliberaciones históricas.
- `Consequences`: efectos positivos, límites y trabajo futuro.

Para cambiar una decisión aceptada, crear un ADR nuevo que indique cuál reemplaza y actualizar `ARCHITECTURE.md`, `ROADMAP.md` y `HANDOFF.md`.
