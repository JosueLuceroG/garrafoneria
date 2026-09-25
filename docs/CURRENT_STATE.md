# Estado actual

**Fecha de actualización:** 2026-09-25
**Rama Git:** `master`
**Historial Git:** repositorio inicializado, sin commits.
**Fase actual:** Fase 1.1 completada; Fase 2 bloqueada.
**Última fase completada:** Fase 1.1, fundación documental y handoff.

## Resumen

El repositorio contiene un monorepo npm TypeScript con un shell web, un demo móvil local con SQLite, dominio compartido, migración PostgreSQL inicial y documentación base. No hay proyecto Supabase remoto configurado.

## Arquitectura existente

- `apps/admin-web`: React 18 + Vite 5, navegación visual y datos demo estáticos.
- `apps/mobile`: Expo 52 + React Native 0.76 + SQLite, una pantalla de entrega demo.
- `packages/domain`: tipos, cálculo de venta, UUID, folio y `PrinterService` mock.
- `packages/shared`: configuración pública y contrato preliminar de sincronización.
- `supabase/migrations`: esquema central multi-tenant con RLS y FK compuestos.

## Estado por capacidad

### IMPLEMENTADO

- Monorepo npm workspaces.
- TypeScript estricto y referencias de proyectos.
- ESLint y Prettier.
- Shell administrativo web navegable.
- App móvil Expo con layout base.
- SQLite real mediante `SQLiteProvider`.
- Clientes demo locales.
- Producto demo local.
- Selección de cliente.
- Cantidad de garrafones.
- Forma de pago demo: efectivo, transferencia y crédito.
- Cálculo determinista en centavos.
- Captura del nombre de quien recibe.
- Captura de firma mediante puntos táctiles serializados.
- Intento de permiso y captura GPS opcional con `expo-location`.
- Guardado de venta, partida y outbox dentro de una transacción SQLite.
- Estado local inicial de venta `signed` y sincronización `pending`.
- Historial local básico.
- UUID v4 para identidad técnica local.
- Interfaz `PrinterService` y `MockPrinterService`.
- Invocación del mock después de confirmar la transacción local.
- Migración PostgreSQL con `business_id`, RLS, entidades iniciales y FK compuestos.
- Cinco tests de dominio.

### PARCIAL

- Firma: se captura como JSON de puntos; todavía no es un archivo de firma en Storage.
- GPS: se captura si permisos y dispositivo lo permiten; no existe vista de mapa.
- Impresión: el mock se invoca, pero no existe Bluetooth ESC/POS real ni reimpresión desde la UI.
- Offline: SQLite y outbox existen, pero no hay worker que sincronice.
- Multi-tenant: el modelo central y la migración están preparados; el demo usa `demo-business` fijo.
- Panel web: shell y navegación existen; no consume datos ni autenticación.
- Folio: el formateador existe, pero el folio generado por el demo usa timestamp y no es seguro para múltiples dispositivos.

### PROVISIONAL

- Clientes, producto, negocio, ruta, repartidor y dispositivo del móvil son valores demo.
- `note_number` del flujo móvil es provisional.
- `MockPrinterService` representa la impresora.
- Datos del dashboard son textos y métricas demo.
- `supabase/config.toml` es configuración local preparada, no una conexión remota.
- La migración tiene el diseño inicial, no una base aplicada a producción.

### NO IMPLEMENTADO

- Supabase remoto.
- Supabase Auth real.
- Registro y activación de dispositivos.
- Descarga inicial desde nube.
- Worker, endpoint o Edge Function de sincronización.
- Subida de firmas a Storage.
- Bluetooth ESC/POS.
- Reimpresión en interfaz.
- Dashboard conectado.
- Mapas o tracking en vivo.
- Reportes.
- Cancelaciones y correcciones auditables en código.
- Roles administrativos operativos en UI.
- Estrategia de folios offline multi-dispositivo.

## Pruebas y verificaciones

Última verificación conocida del repositorio:

- `npm run typecheck`: correcto.
- `npm run typecheck --workspace @garrafoneria/mobile`: correcto.
- `npm run test`: 5 tests pasaron.
- `npm run lint`: correcto.
- `npm run format:check`: correcto.
- `npm run build`: build del panel web correcto.
- `npm audit --omit=dev`: reporta vulnerabilidades transitivas; no se ejecutó `npm audit fix --force`.

La app Android no se ha verificado en un dispositivo físico dentro de este repositorio.

## Deuda técnica y riesgos

- La transacción local no tiene tests automatizados de integración SQLite.
- El worker de sincronización todavía no existe.
- El folio provisional no puede usarse en operación comercial multi-dispositivo.
- La firma local es un payload serializado, no una evidencia almacenada de forma durable en nube.
- El esquema central tiene políticas RLS de lectura; las escrituras futuras deben pasar por una operación servidor validada.
- Expo/RN y herramientas transitorias tienen avisos de auditoría que requieren una revisión planificada, no una actualización forzada.
- No hay commits que preserven puntos históricos de la fase.

## Bloqueadores

- Definir la estrategia de folios reservados para trabajo offline.
- Definir el contrato servidor de sincronización idempotente.
- Tener un proyecto Supabase de desarrollo y credenciales públicas de entorno.
- Tener un dispositivo Android para validar SQLite, firma, permisos GPS y development build.

## Próximos pasos documentales y técnicos

El siguiente paso exacto está en [`HANDOFF.md`](HANDOFF.md). Esta fase no autoriza comenzar Fase 2.
