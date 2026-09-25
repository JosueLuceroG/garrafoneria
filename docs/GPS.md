# GPS

## Propósito

El GPS aporta evidencia adicional de dónde se registró una entrega. No sustituye la nota, el cliente, la firma ni la fecha/hora.

## Captura actual

`apps/mobile/App.tsx` solicita permiso foreground mediante `expo-location` y obtiene una posición con precisión balanceada. Se guarda:

- `latitude`;
- `longitude`;
- `accuracyMeters` cuando la plataforma lo entrega;
- `capturedAt` derivado del timestamp de la posición.

En SQLite se serializa en `sales.gps_json`. En el esquema central existen columnas equivalentes en `delivery_proofs`.

## Sin Internet

GPS y mapas online son problemas distintos. Un dispositivo puede obtener coordenadas sin tener Internet; por eso la captura intenta ejecutarse antes de guardar y no depende de un mapa.

## Fallos

Permiso denegado, señal insuficiente o error de la API no bloquean la venta. El GPS es opcional y la interfaz informa que se guarda sin ubicación cuando corresponde.

## Privacidad

Solo debe capturarse el punto necesario para la entrega, no seguimiento continuo. El acceso a coordenadas debe restringirse por business y rol. No registrar coordenadas innecesariamente en logs.

## Planeado

- Sincronización del punto con la nota.
- Vista de mapa administrativo.
- Filtros por fecha, ruta y entrega.

## Fuera del MVP

Tracking GPS en vivo, historial de trayecto y geocercas.
