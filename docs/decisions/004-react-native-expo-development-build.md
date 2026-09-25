# ADR-004: React Native, Expo y Development Build

**Status:** Accepted

## Context

El producto necesita Android inicialmente, una misma app para celular y tablet, TypeScript y futuras capacidades nativas como Bluetooth.

## Decision

La app móvil usa React Native, Expo y TypeScript. La ejecución de producción se orienta a Development Build; Expo Go no es el objetivo de producción.

## Alternatives considered

No hay alternativas documentadas.

## Consequences

- La configuración está en `apps/mobile/app.json`.
- Los módulos nativos futuros requieren prebuild/development build.
- Actualmente solo se verificó typecheck; no se registró prueba física Android.
