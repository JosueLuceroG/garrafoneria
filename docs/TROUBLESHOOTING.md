# Troubleshooting

Esta base se irá ampliando con incidencias reproducibles. No se registran problemas como hechos si no han ocurrido en este repositorio.

## npm

### Instalación con advertencias de auditoría

La instalación puede reportar vulnerabilidades transitivas relacionadas con Expo, Metro, Vite y herramientas de desarrollo. No ejecutar `npm audit fix --force`: puede cambiar versiones mayores del stack. Registrar una actualización planificada y verificar compatibilidad antes de realizarla.

### Workspaces no encontrados

Ejecutar comandos desde la raíz del repositorio, donde está el `package.json` con `workspaces`, y verificar que `node_modules` esté instalado.

## TypeScript

Ejecutar primero `npm run typecheck` y, para el móvil, `npm run typecheck --workspace @garrafoneria/mobile`. No desactivar `strict` para ocultar errores.

## Expo y Android

No existe una prueba física registrada todavía. Si falla la ejecución, verificar Android Studio, SDK, dispositivo/emulador y development build antes de modificar código.

## SQLite

La base local se crea mediante `initializeDatabase` al iniciar `SQLiteProvider`. Si el esquema cambia durante desarrollo, revisar la estrategia de migración local; no asumir que borrar la base es una solución aceptable para datos reales.

## GPS

El permiso puede ser denegado o la posición puede no estar disponible. El comportamiento previsto es guardar sin GPS, no bloquear la venta.

## Supabase

No hay instancia remota en esta fase. Un error de URL o anon key no representa un problema del flujo local; no agregar credenciales ficticias al código.

## Bluetooth

Bluetooth ESC/POS no está implementado. El único adaptador existente es `MockPrinterService`.

## Sincronización

No hay worker ni endpoint. Una venta `pending` no indica un error: indica que todavía no existe la implementación de sync.
