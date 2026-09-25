# Flujos de usuario

## Flujo objetivo del repartidor

```mermaid
flowchart TD
  A[Wi-Fi antes de salir] --> B[Descargar clientes, rutas, productos y precios]
  B --> C[Iniciar ruta]
  C --> D[Seleccionar cliente]
  D --> E[Agregar productos y cantidades]
  E --> F[Calcular total y forma de pago]
  F --> G[Capturar receptor]
  G --> H[Capturar firma]
  H --> I[Intentar GPS]
  I --> J[Guardar venta + items + outbox en SQLite]
  J --> K[Bloquear nota]
  K --> L[Imprimir ticket]
  L --> M[Siguiente cliente]
  M --> N[Regresar y recuperar Internet]
  N --> O[Sincronizar y recibir confirmación]
```

**Estado actual:** solo la parte local desde selección demo hasta mock de impresión está implementada. Descarga, ruta real y sincronización son PLANEADAS.

## Flujo actual del demo móvil

1. La base SQLite se inicializa con dos clientes y un producto demo.
2. El usuario selecciona cliente.
3. Ajusta cantidad de un garrafón de 20 L.
4. Elige efectivo, transferencia o crédito.
5. Escribe receptor.
6. Dibuja firma con toque.
7. La app intenta permiso y captura de GPS.
8. Guarda venta, item y outbox en transacción.
9. Construye el objeto de impresión.
10. Invoca `MockPrinterService`.
11. Actualiza historial local.

## Flujo administrador actual

```mermaid
flowchart LR
  A[Abrir Vite] --> B[Shell web]
  B --> C[Seleccionar módulo en sidebar]
  C --> D[Dashboard demo o placeholder]
```

No existe login. No consulta SQLite móvil ni Supabase. Las métricas son estáticas y los módulos distintos de Dashboard son placeholders.

## Flujo sin Internet

Durante una ruta sin Internet, la app debe leer catálogos locales y persistir cada venta localmente. En el estado actual esto se simula porque los catálogos son insertados localmente; no existe sincronización inicial ni descarga incremental.

## Error de impresión

La venta ya debe estar confirmada en SQLite antes de imprimir. Si el adaptador real falla por Bluetooth, desconexión o papel, se conserva la venta. El demo captura el error del mock, pero todavía no expone una bandeja de reimpresión en UI.

## Reimpresión

**PLANEADA:** seleccionar una venta local ya guardada y enviar el mismo `sale.id` al `PrinterService`. No insertar otra fila en `sales` ni en `outbox`.

## Sincronización interrumpida

```mermaid
sequenceDiagram
  participant M as Móvil
  participant S as Servidor futuro
  M->>S: Venta UUID + idempotency key
  S->>S: Inserta o detecta UUID existente
  S--xM: Respuesta perdida
  M->>S: Reintento con el mismo UUID
  S-->>M: Confirmación de la misma venta
  M->>M: Marca synced
```

El resultado obligatorio es una sola venta. El worker y endpoint todavía no existen.

## Cancelación futura

**PLANEADA:** un usuario autorizado solicita cancelación, el servidor conserva la nota firmada, registra motivo, actor, timestamp y evento de auditoría. No se permitirá editar silenciosamente la nota original.

## Activación futura de dispositivo

**PLANEADA:** administrador crea dispositivo, servidor entrega código temporal, celular lo canjea y el servidor asocia business, dispositivo, ruta y repartidor. Ver `DEVICE_ACTIVATION.md`.
