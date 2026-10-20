# Editorial D'Fernadez

Web de Editorial D’Fernandez: textos escolares personalizados para instituciones educativas en Ayacucho, Perú.

[Visitar la web](https://alber-brayan.github.io/Editorial-D-Fernadez/) · [Ubicación](https://www.google.com/maps/dir/?api=1&destination=-13.13684362522656%2C-74.23237880290648) · [WhatsApp](https://wa.me/51916227046)

**© 2026 Editorial D’Fernandez. Todos los derechos reservados.** El repositorio es público para consulta. El código y los materiales originales mantienen su reserva de derechos; ver [LICENSE](LICENSE). Las dependencias y recursos de terceros conservan sus respectivas licencias; ver [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Ejecutar la web

Requiere Node.js 24 o superior. Desde la carpeta del proyecto:

```sh
npm ci
npm run typecheck
npm run build
npm run preview
```

La vista local se abre en `http://127.0.0.1:3001`. Después de modificar las fuentes, ejecuta otra vez `npm run build` y recarga la página. La salida `dist/` se puede servir en un alojamiento estático. No se necesitan claves de API.

La carpeta local del proyecto está en `F:\EDITORIAL\bookstudio-ai\Editorial-D-Fernadez`. Conserva su repositorio Git independiente; ejecuta estos comandos desde esa carpeta.

## Organización

```text
src/                  componentes React, estilos y control de ventanas
public/editorial/     portadas, contraportadas, logos, fuentes y videos web
scripts/preview.mjs   servidor local con soporte de rangos de video
docs/                 dirección visual y verificaciones
.openai/hosting.json   identidad de la web en Sites
build.mjs             compilación y HTML prerenderizado
index.html            metadatos y plantilla HTML
```

## Experiencia

- Venta exclusiva para instituciones educativas, sin venta individual de ejemplares.
- Portadas e interiores con el logo institucional y propuesta educativa adaptada a su currícula.
- Cinco muestras girables en 3D con sus portadas y contraportadas reales.
- Seis videos propios, optimizados sin pistas de audio; reproducción automática solo en pantalla y sin movimiento reducido.
- En acabados, «A color» abre el video de María Romero. «Blanco y negro» muestra Center con la portada a color; pulsar el libro abre su video.
- El tipo de impresión y encuadernación se conserva en la cotización por WhatsApp. El visitante decide cuándo enviar el mensaje.
- Temas claro y oscuro, preferencia guardada, navegación lateral, ventanas accesibles, foco visible y respeto por el movimiento reducido.
- Google Maps con las coordenadas exactas del local y enlace «Cómo llegar».

## Publicación

### GitHub Pages

La fuente de Pages es **Deploy from a branch → gh-pages → /(root)** en Settings → Pages. `main` conserva las fuentes y `gh-pages` contiene únicamente la web compilada.

Para actualizar la publicación, con Git autenticado y los cambios de fuentes guardados en un commit:

```sh
npm run deploy
```

Este comando comprueba TypeScript, compila y publica el resultado en `gh-pages`. GitHub despliega automáticamente esa rama. El script conserva su historial y no usa pushes forzados.

No publicar directamente la raíz del repositorio: `index.html` es una plantilla y necesita el paso de compilación. Los recursos usan rutas relativas para funcionar tanto en `/Editorial-D-Fernadez/` como en un dominio propio o en la vista local.

### Sites

Este repositorio contiene únicamente la web y sus recursos públicos. Es independiente de BookStudio y no requiere sus API, datos locales ni archivos de producción.

La web conserva su identidad en `.openai/hosting.json`. No cambiar su `project_id` al actualizar el mismo sitio. Las credenciales de publicación son temporales y nunca se guardan en el repositorio. El repositorio es público; el acceso a la web alojada conserva su configuración en Sites.

`node scripts/prepare-publication.mjs` prepara las fuentes en el checkout de Sites, después de abrirlo con la herramienta de publicación. La compilación y publicación usan ese checkout para mantener el código y la salida estática de la misma versión.

Los videos aquí incluidos son las versiones web silenciosas. Los originales de producción permanecen en el archivo local de la editorial.
