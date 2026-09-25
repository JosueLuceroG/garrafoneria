# Mobile Offline-First

## Principio

El repartidor debe poder terminar una entrega sin conexión. SQLite es la fuente operativa local del dispositivo durante la ruta. La red solo cambia el estado de sincronización; no debe decidir si la nota se guarda.

## Orden de una entrega

1. Seleccionar cliente y productos desde datos locales.
2. Calcular el total en centavos con dominio compartido.
3. Capturar receptor y firma.
4. Intentar GPS sin bloquear si no está disponible.
5. Guardar venta, partidas y outbox en una transacción SQLite.
6. Solo después intentar imprimir.
7. Permitir reimpresión usando el mismo `sale.id`.

La Fase 1 implementa los pasos locales en `apps/mobile/App.tsx` y `apps/mobile/src/storage/database.ts`. El flujo sí invoca `MockPrinterService` después de la transacción; todavía no existe el adaptador Bluetooth real.

## Datos locales mínimos

La base local contiene clientes, productos, ventas, partidas y outbox. Una venta local conserva firma como payload local serializado; al sincronizar, la firma pasará a Storage y PostgreSQL conservará su referencia.

La tabla local `sales` conserva `total_cents`, pero no tiene todavía `subtotal_cents` separado. `sale_items` no repite `business_id` y usa IDs de texto demo. Estas diferencias son aceptables para el demo local y deben resolverse antes de sincronización real, sin asumir que el esquema local y central son idénticos.

## Fallos

- Sin GPS: guardar la entrega sin GPS y dejar constancia en la interfaz.
- Sin impresora: conservar la venta y dejarla disponible para reimpresión.
- Sin red: conservar estado pendiente.
- Error de sincronización: conservar venta y error; no borrar ni marcar sincronizada.

## Evolución pendiente

- Cifrado o protección adicional de SQLite según el modelo de amenaza acordado.
- Limpieza segura de datos ya confirmados por servidor.
- Descarga incremental de clientes, rutas, precios y configuración.
- Bloqueo de sesión y activación de dispositivo.
- Reserva offline de rangos de folios por ruta y dispositivo, pendiente de decisión de negocio.

## Recuperación

SQLite usa WAL y las inserciones de venta, item y outbox se realizan en una transacción. Si la app se cierra después del commit y antes de imprimir, la venta debe permanecer consultable; el demo no implementa todavía una cola de impresión pendiente. Si se cierra durante la transacción, SQLite debe completar o revertir la transacción. No existe aún una prueba de reinicio o recuperación que lo verifique en dispositivo físico.
