# Prompt listo para Claude

Copiá y pegá desde la línea siguiente en Claude y adjuntá el ZIP completo de la tienda.

---

Quiero que continúes el desarrollo de mi tienda online **Music Importaciones** usando el proyecto completo adjunto. No empieces una tienda nueva ni reemplaces el diseño existente: abrí, revisá y continuá este código.

## Objetivo inmediato

1. Descomprimí el proyecto.
2. Leé primero `CONTEXTO_COMPLETO_NEGOCIO.txt` y `CONTEXTO_TECNICO_Y_COMERCIAL.md`.
3. Instalá las dependencias y abrí la tienda localmente.
4. Confirmá que todas las rutas, imágenes, productos, filtros, favoritos, carrito y enlaces de WhatsApp funcionen.
5. Mostrame primero la vista local. No cambies precios, especificaciones, stock, garantía, costos ni condiciones comerciales sin preguntarme.
6. Cuando yo confirme la vista, generá la versión de producción y ayudame a publicarla con un enlace estable. La opción más sencilla es Netlify; el proyecto ya incluye la redirección necesaria para una aplicación React.

## Datos obligatorios

- Marca visible: **Music Importaciones**.
- WhatsApp comercial: **+54 9 11 5971-5328**. Enlaces: `5491159715328`.
- Moneda y formato: pesos argentinos, por ejemplo `$ 250.000`.
- Atención personalizada y todos los botones de contacto deben dirigir al WhatsApp indicado.
- Envíos nacionales: Correo Argentino.
- Envíos en el día: solamente para las 47 localidades cargadas en `src/data/shipping.ts`.
- Horario de corte configurado: 12:00, hora de Buenos Aires.
- No agregues precios de envío a la lista de localidades.
- No inventes especificaciones, autonomía, potencia, stock, garantía, originalidad, certificaciones ni accesorios.

## Productos con precio confirmado en la tienda

- Samsung Galaxy A16 4G SM-A165F: `$ 250.000`.
- POCO M7 4G 8 GB + 256 GB: `$ 350.000`.
- Parlante JBL Charge 6: `$ 260.000`.
- Aspiradora portátil Inova AP-321: `$ 55.000`.
- Licuadora portátil Inova 400 ml: `$ 25.000`.

Los demás productos pueden figurar con “Consultar precio” hasta que yo confirme el valor.

## Precauciones importantes

- La autonomía real informada de la aspiradora Inova AP-321 es aproximadamente **45 a 50 minutos**. No publiques que dura dos horas.
- Algunas fotos recibidas para el JBL muestran una caja que dice Charge 5 aunque el producto se cargó como Charge 6. No presentes esas imágenes como prueba de un Charge 6 sin que yo confirme cuáles corresponden.
- Diferenciá siempre RAM física de RAM virtual.
- No afirmes que un producto es original si no hay documentación suficiente.
- El carrito, el pago, los cupones y la cuenta de usuario todavía son un prototipo visual. Antes de vender, proponé una solución real o un cierre de pedido completo por WhatsApp.

## Imágenes pendientes

En `material_pendiente/aspiradora/` hay dos imágenes nuevas asignadas a la aspiradora Inova AP-321. Todavía no deben incorporarse automáticamente. Mostrámelas dentro de una propuesta de orden para la galería y esperá mi confirmación.

## Cómo abrir el proyecto

```bash
npm install
npm run dev
```

Para producción:

```bash
npm run build
npm run preview
```

La carpeta lista para publicar es `dist/`. Para Netlify se puede subir esa carpeta directamente; `public/_redirects` ya contiene la regla para que funcionen las rutas internas.

Trabajá conmigo paso a paso, en español sencillo, y mostrámelo antes de publicar cambios importantes.

---
