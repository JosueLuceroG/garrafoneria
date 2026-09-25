# Comprobante de entrega

## De físico a digital

Antes, el original físico firmado regresaba a la garrafonería. Ahora, el sistema debe conservar una nota digital firmada como equivalente operativo del original.

## Evidencia relacionada

La evidencia debe poder relacionar:

- nota y UUID técnico;
- business;
- cliente;
- productos, cantidades y precios;
- total y forma de pago;
- nombre de quien recibe;
- firma;
- fecha y hora;
- repartidor;
- ruta;
- dispositivo;
- GPS opcional.

## Estado actual

- **PARCIAL:** el demo exige receptor y trazo de firma antes de guardar.
- **PARCIAL:** fecha/hora se registran con `new Date().toISOString()` del dispositivo.
- **PARCIAL:** GPS se guarda en JSON si está disponible.
- **PROVISIONAL:** la firma es JSON de puntos en SQLite.
- **NO IMPLEMENTADO:** Storage, referencia `signature_storage_path`, hash de archivo, consulta web y PDF.

## Bloqueo

El flujo guarda una venta con estado `signed`. La regla de producto es que la firma bloquea la nota y cualquier cancelación o corrección futura debe ser auditable. El modelo central contempla `cancelled`, pero todavía no existe una transición implementada ni pantalla de cancelación.

## Futuro

La firma se transformará en un archivo seguro de Supabase Storage; PostgreSQL conservará la ruta de Storage y los metadatos. Una futura vista administrativa podrá mostrar evidencia y, si se aprueba, generar PDF.
