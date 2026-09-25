# Protocolo de sincronización

## Objetivo

Entregar una operación local al servidor sin perderla, duplicarla o marcarla confirmada antes de tiempo.

## Contrato base

Cada entrada de outbox contiene `id`, entidad, `entity_id`, operación, intentos, estado, error y timestamps. Para ventas, `entity_id` es el UUID de `sales.id`.

El contrato compartido preliminar está en `packages/shared/src/index.ts` como `SaleSyncPayload`. No es todavía un endpoint ni una validación de servidor.

## Flujo

1. Un worker selecciona entradas `pending` o `failed` reintentables.
2. Marca la entrada como `syncing` de forma local.
3. Envía el UUID de venta como idempotency key y el payload completo.
4. El servidor inserta o devuelve la venta existente con ese UUID.
5. Solo con una respuesta válida el móvil marca venta y outbox como `synced`.
6. Si se corta la respuesta, el móvil reintenta. La restricción `sales.id` y la operación idempotente evitan una segunda venta.

## Restricciones

- Nunca usar el número visible como única clave de idempotencia.
- El folio visible provisional del demo no puede publicarse como folio comercial; la sincronización real debe usar folios reservados o asignados por servidor.
- Nunca eliminar una entrada por un error transitorio.
- Aplicar backoff y límite operativo de reintentos cuando se implemente el worker.
- Registrar errores sin exponer secretos o firmas en logs.
- El servidor valida pertenencia al negocio, precios autorizados y estado de la nota; no confía en totales sensibles enviados por el cliente.

## Estados y acknowledgement

- `local_only`: registro creado localmente pero aún no preparado para envío; el flujo actual no lo utiliza.
- `pending`: listo para enviar; es el estado que recibe la venta demo.
- `syncing`: un worker futuro lo tomó.
- `synced`: solo después de acknowledgement válido del servidor.
- `failed`: último intento falló; conserva `last_error` y puede reintentarse según política.

Un acknowledgement válido debe identificar el mismo UUID de venta y el mismo business. Una respuesta perdida no autoriza marcar `synced`.

## Reintentos y reconciliación

La política de backoff, límite de intentos y clasificación de errores sigue abierta. Los errores de red deben reintentarse; los errores de validación deben quedar visibles y no repetirse indefinidamente. Si servidor y móvil difieren, la reconciliación debe ser explícita y auditable; nunca sobrescribir una nota firmada silenciosamente.

## Estado actual

La Fase 1 crea la tabla outbox y deja la venta en `pending`. No existe todavía worker ni endpoint remoto.

## Preguntas abiertas

- ¿El endpoint será una Edge Function única o RPCs protegidas de PostgreSQL?
- ¿La política de conflicto será rechazo, actualización o cancelación compensatoria?
- ¿Qué tamaño y formato de firma se aceptará para Storage?
