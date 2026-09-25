# Contexto del proyecto

## Origen

Garrafonería nace para digitalizar la operación de un negocio que vende y distribuye garrafones de agua mediante rutas en vehículos. El punto de partida no es una plataforma SaaS pública, sino una garrafonería real con repartidores y administración central.

## Proceso tradicional

1. El repartidor entrega garrafones al cliente.
2. Genera una nota física.
3. El cliente firma.
4. La copia queda con el cliente.
5. La nota original firmada regresa físicamente a la garrafonería.

Este modelo depende de papel, permite pérdida o deterioro, dificulta consultar históricos y obliga a capturar información manualmente. La evidencia de entrega queda dispersa y consolidar rutas requiere trabajo administrativo.

## Proceso objetivo

El repartidor usa inicialmente un celular Android y, posteriormente, la misma aplicación adaptada a tablet Android. Durante la ruta puede pasar horas sin Internet.

El flujo objetivo es:

1. Seleccionar cliente.
2. Registrar productos y cantidades.
3. Calcular total.
4. Elegir forma de pago.
5. Capturar quién recibe.
6. Capturar firma.
7. Capturar GPS cuando esté disponible.
8. Registrar fecha y hora.
9. Guardar la venta localmente.
10. Bloquear la nota firmada.
11. Imprimir un ticket por Bluetooth ESC/POS.
12. Entregar el ticket y continuar la ruta.
13. Sincronizar cuando regrese la conectividad.

El equivalente digital de la nota original es una nota digital firmada, conservada con su evidencia y metadatos.

## Componentes y usuarios

- Repartidor: necesita velocidad, botones grandes y continuidad offline.
- Administrador o dueño: necesita consultar y administrar la operación desde una laptop.
- App móvil: fuente operacional local durante una ruta sin red.
- Panel web: consulta y administración de la información central.
- Backend: fuente central después de una sincronización confirmada.

## Por qué existe cada dato

- Firma: evidencia primaria de que alguien recibió la entrega.
- Receptor: identifica a la persona que confirmó.
- Fecha y hora: sitúan la entrega en el tiempo.
- GPS: evidencia adicional de ubicación; no debe bloquear una entrega.
- Ticket: comprobante físico para el cliente y salida operativa familiar.
- Ruta, repartidor y dispositivo: atribuyen la operación y ayudan a auditarla.
- Panel: sustituye la revisión manual de papeles y permite consultar históricos.

## Filosofía

La conexión no debe decidir si una entrega puede registrarse. La operación local debe sobrevivir a cortes de red, batería o cierre normal de la app. La impresión es una salida, nunca la fuente de verdad. Las notas firmadas no se modifican silenciosamente y las acciones posteriores deben ser auditables.

## Estado de este contexto

El producto está en una fundación local y documental. Existe un demo de captura en SQLite, pero todavía no existe nube conectada, autenticación real ni Bluetooth real.
