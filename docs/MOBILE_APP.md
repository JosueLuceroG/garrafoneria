# Aplicación móvil

## Propósito

Una sola aplicación React Native + Expo para repartidores Android. Debe funcionar en celular y posteriormente en tablet sin crear dos proyectos separados.

## Dependencias y configuración real

La aplicación está definida en `apps/mobile/package.json` con Expo `~52.0.0`, React Native `0.76.6`, `expo-sqlite`, `expo-location` y `react-native-svg`. `apps/mobile/app.json` declara permisos de ubicación y plugins de SQLite/location.

La configuración de TypeScript usa `expo/tsconfig.base` y mantiene strict, `noUncheckedIndexedAccess` y `exactOptionalPropertyTypes`.

## Estructura actual

- `apps/mobile/App.tsx`: pantalla, estado del formulario, firma, GPS, transacción SQLite y llamada al mock.
- `apps/mobile/src/storage/database.ts`: creación de tablas, WAL y datos demo.
- `apps/mobile/src/storage/types.ts`: forma de fila usada por el historial local.
- `apps/mobile/app.json`: identidad Expo y permisos Android.
- `apps/mobile/expo-env.d.ts`: referencia de tipos Expo.

No existe todavía una separación de carpetas por navegación, repositorios, sync worker o adaptadores nativos.

## Flujo actual

La pantalla permite dos clientes demo, un producto demo, cantidad, tres métodos de pago, nombre de receptor y firma táctil. Antes de guardar intenta GPS. Después usa `withTransactionAsync` para insertar venta, item y outbox. Luego instancia un `Sale` y llama `MockPrinterService`.

El historial consulta ventas locales unidas a clientes. El estado visible de sincronización es el texto almacenado en SQLite.

## Firma

La firma se captura mediante `onTouchStart` y `onTouchMove` de un `View`. Los puntos se dibujan con `react-native-svg` y se serializan como JSON en `sales.signature_data`. No existe imagen binaria, hash, Storage ni firma criptográfica.

## GPS

`expo-location` solicita permiso foreground y usa precisión balanceada. Si no hay permiso, señal o posición, se guarda `gps_json` como null y la venta continúa.

## Impresión

La app usa `MockPrinterService` importado desde `packages/domain`. El mock se llama después del commit SQLite. No hay Bluetooth, estado de papel, reimpresión ni módulo nativo.

## Celular y tablet

- **Celular:** es la superficie inicial y el diseño actual prioriza una columna, botones grandes y pasos compactos.
- **Tablet:** está contemplada por la orientación `default`, pero no existe todavía un layout específico ni prueba visual. No afirmar que ya sea responsive de forma completa.

## Riesgos actuales

- La función usa constantes demo para business, ruta, repartidor y dispositivo.
- El folio es provisional.
- El `useEffect` inicial consulta el historial, pero no existe sincronización ni rehidratación de catálogos remotos.
- No existe prueba en Android físico registrada.
