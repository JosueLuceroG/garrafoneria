# ADR-002: Supabase y PostgreSQL como backend central

**Status:** Accepted

## Context

El sistema necesita una base central, autenticación, almacenamiento de firmas, RLS y lógica servidor futura.

## Decision

El backend objetivo usa Supabase, PostgreSQL, Supabase Auth, Supabase Storage y Edge Functions cuando una operación requiera validación servidor.

## Alternatives considered

No hay alternativas documentadas en el repositorio inicial.

## Consequences

- Las migraciones SQL son parte del repositorio.
- RLS y `business_id` son obligatorios.
- Todavía no existe un proyecto remoto.
- `service_role` queda restringido al servidor futuro.
