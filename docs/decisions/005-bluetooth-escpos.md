# ADR-005: Impresión Bluetooth ESC/POS

**Status:** Accepted

## Context

El repartidor utiliza una impresora térmica portátil de aproximadamente 58 mm y el ticket forma parte del proceso operativo.

## Decision

La impresión objetivo será Bluetooth Android con protocolo ESC/POS detrás de `PrinterService`. El dominio no conocerá marca ni transporte.

## Alternatives considered

No hay alternativas registradas.

## Consequences

- `PrinterService` ya existe.
- `MockPrinterService` permite probar el orden del flujo sin hardware.
- El adaptador Bluetooth real y sus módulos nativos quedan fuera de Fase 1.1.
- Guardar primero es obligatorio; imprimir nunca confirma la venta.
