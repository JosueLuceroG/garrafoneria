# Supabase

## Estado

**NO EXISTE TODAVÍA UN PROYECTO SUPABASE REMOTO CONFIGURADO.**

Existe `supabase/config.toml` como preparación local y una migración SQL inicial. No hay URL real, anon key real, Auth conectado, Storage configurado en un proyecto ni Edge Function desplegada.

## Responsabilidades previstas

- PostgreSQL: fuente central, constraints, índices y estados persistidos.
- Auth: identidad de usuarios administrativos y futuros repartidores.
- RLS: aislamiento por `business_id` en cada tabla de negocio.
- Storage: archivos de firma y futuros documentos, con políticas privadas.
- Edge Functions: sincronización idempotente, validación de payloads y operaciones que no deben confiar en el cliente.

## Migración actual

`supabase/migrations/202501240001_initial_schema.sql` crea entidades, enums, FK compuestos, índices, función `is_business_member` y políticas RLS de lectura. La migración no se ha aplicado a una instancia real.

## Variables

`.env.example` contiene solo nombres y valores ficticios:

- `VITE_SUPABASE_URL`;
- `VITE_SUPABASE_ANON_KEY`;
- `EXPO_PUBLIC_SUPABASE_URL`;
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`.

La anon key no es un secreto de servidor, pero requiere RLS correcto. `service_role` solo puede existir en infraestructura servidor futura.

## Regiones y operación

La región del proyecto, backups, retención y entorno de staging todavía no están decididos. No inventar una región ni crear un proyecto para resolver esta fase documental.

## Antes de conectar

1. Aprobar estrategia de folios.
2. Aprobar contrato de sync.
3. Revisar RLS con Auth real.
4. Definir Storage y retención de firmas.
5. Crear variables de entorno locales sin subirlas a Git.
6. Aplicar migración en entorno de desarrollo y validar con pruebas de tenant.
