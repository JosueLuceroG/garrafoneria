# Seguridad y privacidad

## Reglas

- Supabase Auth identifica usuarios; `business_users` autoriza acceso por tenant.
- RLS debe estar habilitado en toda tabla de negocio.
- Nunca enviar `service_role` al navegador ni a la app móvil.
- Variables públicas solo contienen URL y anon key; los secretos viven en Edge Functions o configuración de Supabase.
- Validar en servidor negocio, producto, precio, estado y UUID de idempotencia.
- Las notas firmadas no se modifican silenciosamente.
- Firmas y GPS se consideran datos de evidencia y deben tener acceso restringido.
- No registrar firmas, tokens ni payloads financieros completos en logs.
- Permitir en una fase posterior exportar y eliminar datos según política del negocio.

## Estado implementado frente a diseño

- **IMPLEMENTADO en diseño SQL:** `business_id`, FK compuestos, RLS habilitado y función de pertenencia.
- **PARCIAL:** la migración tiene políticas de lectura; autenticación y escrituras servidor no están conectadas.
- **PLANEADO:** Auth real, Storage privado, autorización por rol, auditoría de cancelaciones y revocación de dispositivos.
- **NO IMPLEMENTADO:** cifrado adicional de SQLite, PIN/biometría, exportación y borrado operativo.

## Dispositivo

La APK no contiene credenciales administrativas. La activación futura vinculará un dispositivo autorizado a un negocio, ruta y repartidor mediante un código temporal.

## Amenazas relevantes

- Pérdida o robo de un celular con datos locales.
- Repetición de payloads por conexión intermitente.
- Manipulación de `business_id`, precios o totales desde un cliente no confiable.
- Acceso indebido a firmas en Storage.

## Reglas de confianza

El cliente puede estar desactualizado o manipulado. El servidor futuro deberá recalcular o validar totales, comprobar que todos los IDs pertenecen al mismo business, verificar estado de nota y usar timestamps de servidor cuando sean relevantes. Una `anon key` es pública y no sustituye RLS; una `service_role` nunca debe llegar a web o móvil.

## Preguntas abiertas

- ¿Se requerirá PIN local, biometría o expiración de sesión?
- ¿Cuánto tiempo deben conservarse firmas, GPS y notas canceladas?
- ¿Qué roles exactos pueden administrar dispositivos y cancelar notas?
