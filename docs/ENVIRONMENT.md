# Entorno de desarrollo

## Requisitos declarados

- Node.js `>=20`, según `package.json` raíz.
- npm con soporte de workspaces; la verificación documentada se ejecutó con npm 11.19.1.
- Para móvil: Android Studio, SDK Android y un development build.
- Para web: navegador moderno.

Las versiones de paquetes están declaradas en los `package.json`; no duplicar versiones aquí si pueden cambiar. La app móvil usa Expo `~52.0.0`, React Native `0.76.6` y React Native SVG `15.8.0`.

## Workspaces

El root declara `apps/*` y `packages/*` como workspaces:

- `@garrafoneria/admin-web`;
- `@garrafoneria/mobile`;
- `@garrafoneria/domain`;
- `@garrafoneria/shared`.

## Instalación

```bash
npm install
```

No se requiere `.env` para el demo local actual. Si se prepara una conexión futura, partir de `.env.example`; no crear ni subir secretos.

## Comandos

```bash
npm run dev:admin
npm run dev:mobile
npm run typecheck
npm run typecheck --workspace @garrafoneria/mobile
npm run test
npm run lint
npm run format:check
npm run build
```

`npm run build` construye los workspaces que tienen script de build, actualmente el panel web. El móvil se verifica con su typecheck y requiere desarrollo nativo para generar y ejecutar Android.

## Variables disponibles

Solo están preparadas, no consumidas por una conexión Supabase actual:

- `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` para web.
- `EXPO_PUBLIC_SUPABASE_URL` y `EXPO_PUBLIC_SUPABASE_ANON_KEY` para móvil.
