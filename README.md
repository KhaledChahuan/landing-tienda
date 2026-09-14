# tiendacencocal.com — dominio dado de baja

La tienda online se migró a **tienda.cencocal.cl**. Por requerimiento de Cencocal (septiembre de 2026), el
dominio antiguo quedó inactivo y desvinculado de la tienda nueva: **toda URL responde `410 Gone`** con
`X-Robots-Tag: noindex`, sin redirecciones, para que Google lo retire de sus resultados.

- `vercel.json` reescribe todas las rutas a `api/gone.js`, que responde el 410.
- La landing de migración anterior (y el puente de QR con `utm_*`) sigue en el historial de git.

## Trazabilidad de QR

Los QR nuevos apuntan directo a `https://tienda.cencocal.cl/home?utm_source=...`. Para contar escaneos, la
tienda incluye:

```html
<script src="https://link.cencocal.com/qr-scan.js" defer></script>
```

y `https://tienda.cencocal.cl` tiene que estar en los orígenes autorizados de CencoLink (`lib/qr/cors.ts`).

## Mantener el dominio registrado

No dejar expirar `tiendacencocal.com` (DNS en SiteGround): si queda libre, un tercero podría comprarlo y
recibir el tráfico que aún llegue por enlaces antiguos.
