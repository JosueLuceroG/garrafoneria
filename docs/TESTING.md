# Testing

## Tests existentes

Los tests están en `packages/domain/src/` y usan Vitest.

- `sales.test.ts`: subtotales, total en centavos y rechazo de venta sin productos.
- `folio.test.ts`: formato de folio, rechazo de secuencia inválida y formato UUID v4.

## Comandos

```bash
npm run test
npm run typecheck
npm run typecheck --workspace @garrafoneria/mobile
npm run lint
npm run format:check
npm run build
```

## Resultado registrado

La última ejecución documentada produjo 5 tests pasados, typecheck raíz y móvil correctos, lint y formato correctos, y build web correcto.

## Prioridades críticas futuras

- Transacción SQLite de venta, item y outbox.
- Persistencia después de reinicio de app.
- Bloqueo posterior a firma.
- Folios y colisiones entre dispositivos.
- Idempotencia ante respuesta perdida.
- Reintentos y transición de sync.
- Aislamiento por business_id y RLS.
- Reimpresión sin duplicar venta.
- Impresión con adaptador mock y real.
- GPS disponible/no disponible.
- Firma serializada y posterior Storage.

## Gaps actuales

No hay pruebas de integración SQLite, pruebas de UI, pruebas Android físico, pruebas SQL ejecutadas contra Supabase ni pruebas de sincronización real. No crear cobertura artificial del 100%; priorizar invariantes.
