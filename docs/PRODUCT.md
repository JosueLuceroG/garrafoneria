# Producto

## Estado de alcance

- **IMPLEMENTADO:** fundación técnica, shell web y captura local demo.
- **PARCIAL:** evidencia, offline, impresión y multi-tenant preparados pero sin operación remota.
- **PLANEADO:** operación conectada, administración real, sincronización y Bluetooth.
- **FUERA DE FASE:** tracking en vivo, mapas completos, reportes avanzados e inventario contable.

## Propósito

Garrafonería ayuda a una garrafonería a entregar productos, cobrar o registrar crédito, conservar evidencia de entrega y administrar su operación sin detenerse cuando el repartidor pierde Internet.

El producto inicial se enfoca en la trazabilidad de una entrega: cliente, productos, precio, total, forma de pago, receptor, firma, fecha/hora, repartidor, dispositivo y ruta.

## Usuarios

- Repartidor: captura entregas rápidamente desde Android, incluso sin red.
- Administrador o dueño: consulta y administra la operación desde un navegador.
- Sistema: sincroniza de forma segura y evita duplicados.

## Propuesta de valor

La conexión no debe decidir si una entrega puede registrarse. La operación local debe ser usable en la calle y la sincronización debe ser posterior, observable y reintentable.

## No objetivos de esta fase

- Bluetooth ESC/POS real.
- Seguimiento GPS en vivo.
- App pública multi-negocio tipo SaaS.
- Reportes avanzados, mapas completos o analítica compleja.
- Integración bancaria, facturación electrónica o inventario contable.
- Autenticación remota conectada a un proyecto real.

## Preguntas abiertas

- ¿La venta de crédito requiere una cuenta por cobrar con abonos desde el MVP o solo registrar la forma de pago?
- ¿Quién puede cancelar una nota y qué ventana de tiempo aplica?
- ¿Se manejarán impuestos, descuentos o devoluciones?
- ¿Qué reglas de negocio debe aplicar cada garrafonería para precios y folios?
- ¿Cómo se asignará una secuencia de folio segura cuando varios dispositivos trabajen offline?
