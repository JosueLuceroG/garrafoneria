# Impresión

## Objetivo

Imprimir un ticket térmico de aproximadamente 58 mm desde Android mediante Bluetooth y comandos ESC/POS, sin acoplar el dominio a una marca concreta.

## Abstracción existente

La interfaz está en `packages/domain/src/printer.ts`:

- `connect()`.
- `disconnect()`.
- `getStatus()`.
- `printReceipt(sale)`.
- `testPrint()`.

`MockPrinterService` mantiene estado de conexión y un registro `printedReceipts`. No imprime físicamente.

## Regla de orden

1. Construir y validar la venta.
2. Guardar venta, partidas y outbox localmente.
3. Confirmar la transacción SQLite.
4. Intentar impresión.
5. Si falla, conservar la venta y permitir reintento futuro.

El flujo actual cumple ese orden con el mock en `apps/mobile/App.tsx`.

## Reimpresión

**PLANEADA:** una reimpresión recibe el `sale.id` existente y vuelve a renderizar el ticket. No inserta una venta, no cambia el total y no crea una nueva outbox.

## Fallos futuros

- Bluetooth desconectado: conservar la venta y mostrar acción de reconectar.
- Impresora apagada o no encontrada: conservar la venta.
- Papel agotado: mostrar estado de error; el ticket no debe ser fuente de verdad.
- Error de comando ESC/POS: registrar el fallo de impresión sin duplicar operación.

## Fuera de esta fase

El adaptador Bluetooth Android real, la selección de impresora, el manejo de papel y la prueba con impresoras físicas no se implementan en Fase 1.1.
