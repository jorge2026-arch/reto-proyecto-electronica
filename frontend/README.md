# Tienda Loren — Frontend

Frontend estático construido con Astro y Tailwind CSS.

## Desarrollo

Crear `.env` a partir de `.env.example`:

```env
PUBLIC_API_URL=http://localhost:3000
```

Instalar dependencias y generar el sitio:

```bash
npm install
npm run build
```

El resultado estático se genera en `dist/`.

## Despliegue en Vercel

Configurar obligatoriamente la variable pública en **Project Settings → Environment Variables** antes de ejecutar un nuevo despliegue:

```text
PUBLIC_API_URL=https://tu-backend.vercel.app
```

La URL debe ser la dirección pública real del backend, sin una barra final. Si esta variable no existe, el frontend mostrará un error de configuración en lugar de intentar conectarse silenciosamente a `localhost`.

Vercel ejecutará `npm run build` y publicará `dist/`. No se utiliza adaptador SSR ni runtime Node en el frontend.

La comunicación con el backend ocurre desde el navegador mediante `fetch`, enviando el JWT almacenado en `localStorage` como `Authorization: Bearer`.

El dominio de producción del frontend es `https://tiendaelectronica3.infosist.org`. En Vercel, configura el proyecto con la raíz del repositorio y utiliza el `vercel.json` de la raíz. El backend debe desplegarse como un proyecto Vercel independiente con **Root Directory** `backend`.

En el backend configura estas variables:

```text
DATABASE_URL=...
JWT_SECRET=...
JWT_EXPIRES_IN=1h
NODE_ENV=production
CORS_ORIGINS=https://tiendaelectronica3.infosist.org
```

Después de obtener la URL pública del backend, configúrala como `PUBLIC_API_URL` en el proyecto frontend y vuelve a desplegarlo.
