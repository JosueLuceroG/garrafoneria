# Changelog

## Unreleased

### Added

- Monorepo npm con workspaces TypeScript.
- Shell administrativo React + Vite.
- Shell móvil Expo + React Native.
- Dominio compartido para tipos, importes, UUID, folios e impresión.
- Tests de cálculos y folios.
- SQLite local con clientes, productos, ventas, items y outbox demo.
- Flujo local de receptor, firma, GPS opcional y mock de impresión.
- Migración PostgreSQL inicial multi-tenant con RLS y FK compuestos.
- Documentación de contexto, arquitectura, negocio, offline, sync, impresión, evidencia y seguridad.
- Índice, estado actual, handoff, troubleshooting y ADRs.

### Known limitations

- No existe Supabase remoto, Auth real, Storage ni Edge Function.
- No existe Bluetooth ESC/POS real ni reimpresión UI.
- El folio del demo es provisional.
- El panel web usa datos demo.
- La firma permanece como JSON local.
- No hay pruebas en dispositivo Android físico.
