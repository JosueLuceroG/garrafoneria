# Índice de documentación

Este repositorio es la fuente de verdad de Garrafonería. Las conversaciones no sustituyen estos documentos. Si una decisión cambia, se actualiza la documentación relacionada en el mismo cambio.

## Orden recomendado para una persona o IA nueva

1. [`README.md`](../README.md): entrada rápida, comandos y estado resumido.
2. [`PROJECT_CONTEXT.md`](PROJECT_CONTEXT.md): problema operativo y motivo del producto.
3. [`PRODUCT.md`](PRODUCT.md): alcance, usuarios y objetivos.
4. [`BUSINESS_RULES.md`](BUSINESS_RULES.md): invariantes del negocio.
5. [`ARCHITECTURE.md`](ARCHITECTURE.md): límites y comunicación entre componentes.
6. [`CURRENT_STATE.md`](CURRENT_STATE.md): qué existe realmente hoy.
7. [`HANDOFF.md`](HANDOFF.md): cómo continuar desde el último punto.
8. El documento específico de la tarea que se vaya a modificar.

## Documentos por tema

| Documento              | Leerlo para                                                |
| ---------------------- | ---------------------------------------------------------- |
| `PRODUCT.md`           | Producto, alcance y no objetivos.                          |
| `USER_FLOWS.md`        | Flujos del repartidor, administrador, offline e impresión. |
| `BUSINESS_RULES.md`    | Reglas que no deben cambiar silenciosamente.               |
| `ARCHITECTURE.md`      | Diseño conceptual y separación de capas.                   |
| `DATA_MODEL.md`        | Significado de entidades y relaciones.                     |
| `DATABASE.md`          | Convenciones de persistencia y migración actual.           |
| `MOBILE_APP.md`        | Código y comportamiento existente de la app móvil.         |
| `MOBILE_OFFLINE.md`    | SQLite, outbox y límites offline.                          |
| `SYNC_PROTOCOL.md`     | Idempotencia y sincronización futura.                      |
| `PRINTING.md`          | Abstracción de impresión y mock actual.                    |
| `DELIVERY_PROOF.md`    | Nota digital, firma y evidencia de entrega.                |
| `GPS.md`               | Captura y límites de ubicación.                            |
| `ADMIN_WEB.md`         | Shell administrativo actual y visión del panel.            |
| `DEVICE_ACTIVATION.md` | Diseño futuro de activación de APK.                        |
| `SUPABASE.md`          | Preparación de nube sin proyecto remoto.                   |
| `SECURITY.md`          | Tenant isolation, RLS, secretos y amenazas.                |
| `ENVIRONMENT.md`       | Requisitos, variables y comandos.                          |
| `TESTING.md`           | Pruebas existentes y prioridades futuras.                  |
| `TROUBLESHOOTING.md`   | Diagnóstico de problemas conocidos.                        |
| `ROADMAP.md`           | Fases futuras y límites de la fase actual.                 |
| `decisions/`           | Decisiones arquitectónicas registradas.                    |

## Fuentes de verdad por tipo

- Producto: `PRODUCT.md`.
- Reglas de negocio: `BUSINESS_RULES.md`.
- Arquitectura conceptual: `ARCHITECTURE.md`.
- Persistencia: `DATABASE.md`, `DATA_MODEL.md` y `supabase/migrations/`.
- Estado implementado: `CURRENT_STATE.md`.
- Próximo trabajo: `HANDOFF.md` y `ROADMAP.md`.
- Reglas para agentes: `AGENTS.md`.

Cuando haya una discrepancia, se debe inspeccionar la implementación real, corregir el documento más específico y registrar la decisión si cambia el comportamiento.
