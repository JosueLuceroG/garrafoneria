# Reglas de negocio

Los estados indican el vínculo con el código actual: **IMPLEMENTADA**, **PARCIAL**, **PROVISIONAL**, **PLANEADA** o **NO IMPLEMENTADA**.

## Tenancy y ownership

| Regla                                     | Estado   | Evidencia                                                    |
| ----------------------------------------- | -------- | ------------------------------------------------------------ |
| Cada venta pertenece a un `business_id`.  | PARCIAL  | Campo en SQLite, tipos y `sales` SQL; demo fijo.             |
| Cada cliente pertenece a un business.     | PARCIAL  | Campo local y FK compuesto central.                          |
| Cada ruta pertenece a un business.        | PLANEADA | Migración central; no existe catálogo local de rutas.        |
| Cada dispositivo pertenece a un business. | PLANEADA | Migración central; activación no existe.                     |
| Nunca se mezclan datos de businesses.     | PLANEADA | RLS y FK compuestos centrales; sin operación remota todavía. |

## Identidad y folios

- **IMPLEMENTADA:** `sales.id` o el ID local equivalente es la identidad técnica de la venta.
- **IMPLEMENTADA:** `createId()` produce UUID v4.
- **IMPLEMENTADA:** `formatNoteNumber()` separa ruta y secuencia visible.
- **PLANEADA:** una nota no puede duplicarse dentro del mismo business; el UUID y la restricción central deben impedir duplicados.
- **PROVISIONAL:** el demo genera el folio usando timestamp; no garantiza unicidad entre dispositivos offline.
- **PLANEADA:** el servidor debe reservar o asignar rangos de folios antes de operación comercial.
- **PLANEADA:** `note_number` no puede ser la clave idempotente de sincronización.

## Venta y productos

- **IMPLEMENTADA:** una venta requiere al menos un producto.
- **IMPLEMENTADA:** cantidad debe ser entero positivo.
- **IMPLEMENTADA:** precios e importes se calculan en centavos enteros.
- **PARCIAL:** precios pueden ser generales o específicos por cliente en el esquema central; el demo solo usa un precio fijo.
- **PLANEADA:** el servidor validará producto, precio y business; no confiará en totales enviados por el cliente.

## Firma y bloqueo

- **PARCIAL:** el demo exige nombre de receptor y al menos dos puntos de firma.
- **PARCIAL:** la nota se guarda con estado `signed`; no existe aún edición posterior para probar el bloqueo.
- **PLANEADA:** una nota firmada no puede modificarse silenciosamente.
- **PLANEADA:** correcciones y cancelaciones deben ser acciones auditables y conservar el original.
- **IMPLEMENTADA:** GPS no bloquea una venta si falla el permiso o la lectura.
- **PLANEADA:** la firma es evidencia primaria.
- **PLANEADA:** GPS es evidencia secundaria.

## Impresión

- **IMPLEMENTADA:** la transacción SQLite ocurre antes de invocar `MockPrinterService`.
- **IMPLEMENTADA:** un error de impresión no deshace la venta local.
- **PLANEADA:** reimprimir debe usar el mismo UUID y nunca crear otra venta.
- **PLANEADA:** Bluetooth real debe estar detrás de `PrinterService`.

## Sincronización

- **IMPLEMENTADA:** existe outbox local con `entity_id`, operación, estado, intentos y error.
- **IMPLEMENTADA:** la venta local inicia en `pending`.
- **PLANEADA:** el servidor debe aceptar reintentos idempotentes y conservar una sola venta.
- **PLANEADA:** no marcar `synced` hasta recibir confirmación válida.
- **PLANEADA:** errores transitorios no eliminan ventas ni outbox.
- **PLANEADA:** el funcionamiento offline no depende del panel web.

## Pago y crédito

- **IMPLEMENTADA:** el demo permite `cash`, `transfer` y `credit`.
- **PLANEADA:** crédito no se considera efectivo, ingreso ni dinero disponible.
- **PLANEADA:** se debe definir si crédito requiere cuentas por cobrar, abonos e intereses.

## Preguntas abiertas

- ¿Qué estrategia de reserva de folios se aprobará?
- ¿Qué roles pueden cancelar, corregir o reabrir una nota?
- ¿Se permiten descuentos, impuestos, devoluciones o pagos parciales?
- ¿Qué sucede con envases retornables?
- ¿Qué precisión mínima de GPS se considera útil?
