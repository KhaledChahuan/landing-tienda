# Tienda Cencocal — Landing de migración

Landing page estática que se sirve desde **tiendacencocal.com** y dirige el tráfico hacia la nueva tienda en **tienda.cencocal.cl**.

## Stack

- HTML5 semántico
- CSS moderno (variables, Grid, Flexbox, `clamp()`)
- Sin frameworks, sin build step
- Google Fonts: Inter

## Estructura

```
.
├── index.html       # Markup principal con comentarios donde van las imágenes
├── styles.css       # Estilos organizados por secciones
└── README.md
```

## Imágenes pendientes

En el HTML quedaron placeholders comentados con `<!-- ... -->` en los siguientes lugares:

| Ubicación | Archivo sugerido |
|---|---|
| Header (logo principal) | `logo-cencocal.svg` |
| Footer (logo pequeño) | `logo-cencocal-sm.svg` |
| Card sucursal La Calera | `sucursal-la-calera.jpg` |
| Card sucursal Villa Alemana | `sucursal-villa-alemana.jpg` |
| Open Graph (compartir en redes) | `og-image.jpg` (1200×630) |
| Favicon | `favicon.svg` o `favicon.ico` |

Reemplazar cada `<div class="...-placeholder">` por el `<img>` correspondiente cuando los assets estén disponibles.

## Desarrollo local

Cualquier servidor estático sirve. Opciones rápidas:

```bash
# Python 3
python3 -m http.server 8000

# Node (npx serve)
npx serve .
```

Luego abrir `http://localhost:8000`.

## Deploy

Es un sitio 100% estático: se puede subir tal cual a cualquier hosting/CDN.

### Recomendaciones por proveedor

- **Cloudflare Pages / Netlify / Vercel** → conectar el repo y desplegar la raíz; no se necesita build command.
- **AWS S3 + CloudFront** → subir `index.html` y `styles.css` al bucket, configurar `index.html` como documento de índice y servir vía CloudFront con HTTPS.
- **GitHub Pages** → push a `main` y habilitar Pages desde la raíz del repo.

### Deployment con Git + Vercel (flujo recomendado)

#### 1. Subir el proyecto a GitHub

```bash
# Inicializar el repo (solo la primera vez)
git init
git add .
git commit -m "Initial commit: landing de migración"

# Crear el repo en GitHub (vía web o gh CLI) y enlazarlo
git branch -M main
git remote add origin https://github.com/<org-o-usuario>/tiendacencocal-landing.git
git push -u origin main
```

Para futuros cambios:

```bash
git add .
git commit -m "Descripción del cambio"
git push
```

#### 2. Conectar el repo con Vercel

1. Entrar a [vercel.com](https://vercel.com) e iniciar sesión con la cuenta de GitHub.
2. **Add New → Project** y seleccionar el repo `tiendacencocal-landing`.
3. En la pantalla de configuración:
   - **Framework Preset:** `Other` (sitio estático puro).
   - **Build Command:** dejar vacío.
   - **Output Directory:** dejar vacío (se sirve la raíz).
   - **Install Command:** dejar vacío.
4. Click en **Deploy**. Vercel detecta `vercel.json` y aplica `cleanUrls` + `trailingSlash: false`.
5. Cada `git push` a `main` desencadena un deploy automático a producción; cada PR genera un *preview deployment* con URL única.

#### 3. Configurar dominio custom (`tiendacencocal.com`)

1. En el proyecto de Vercel → **Settings → Domains**.
2. Agregar `tiendacencocal.com` y también `www.tiendacencocal.com` (Vercel sugiere cuál usar como canónico y redirige el otro).
3. Vercel mostrará los registros DNS a configurar en el proveedor del dominio:
   - **Apex (`tiendacencocal.com`):** registro `A` apuntando a `76.76.21.21`.
   - **Subdominio `www`:** registro `CNAME` apuntando a `cname.vercel-dns.com`.
4. Esperar la propagación DNS (minutos a unas horas). Vercel emite el certificado SSL/TLS automáticamente vía Let's Encrypt.
5. Verificar en **Domains** que ambos dominios muestren estado *Valid Configuration* y HTTPS activo.

> **Importante:** mantener el dominio `tiendacencocal.com` activo para preservar el SEO heredado mientras se consolida `tienda.cencocal.cl`.

### DNS (referencia general)

Apuntar `tiendacencocal.com` (registro `A` / `CNAME` según el proveedor) al hosting elegido. Para Vercel: `A` → `76.76.21.21` en el apex y `CNAME` → `cname.vercel-dns.com` en `www`.

### Cabeceras recomendadas

```
Cache-Control: public, max-age=3600, must-revalidate
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

## SEO

- `<title>` y `<meta name="description">` configurados.
- `<link rel="canonical">` apunta a `https://tienda.cencocal.cl/` para consolidar autoridad en el nuevo dominio.
- Open Graph y Twitter Cards listos (falta subir `og-image.jpg`).

## Accesibilidad

- Estructura semántica (`header`, `main`, `section`, `article`, `footer`).
- Foco visible (`:focus-visible`).
- Respeto a `prefers-reduced-motion`.
- Contraste verificado para texto sobre fondos primarios.

## Licencia

© 2026 Cencocal S.A. Todos los derechos reservados.
