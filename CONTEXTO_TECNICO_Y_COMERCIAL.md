# Music Importaciones — estado de la tienda

## Proyecto

- Aplicación React 18 + TypeScript + Vite + Tailwind CSS.
- Fuente principal de productos: `src/data/products.ts`.
- Categorías: `src/data/categories.ts`.
- Localidades de envío en el día: `src/data/shipping.ts`.
- WhatsApp y formato de precios: `src/lib/format.ts`.
- Fotografías que usa la tienda: `public/products/`.
- Logo y recursos de marca: `public/brand/` y otros archivos dentro de `public/`.
- Build de producción actual incluida en `dist/`.

## Identidad visual acordada

La tienda usa el logo multicolor de Music Importaciones, fondos tecnológicos oscuros, acentos cian, violeta y magenta, tipografía sans serif limpia, tarjetas redondeadas y una estética tecnológica premium. Debe funcionar correctamente en celular y computadora.

Mensajes principales:

- “Tecnología que potencia tu día”.
- “Celulares, accesorios y productos seleccionados con garantía y respaldo”.
- Posicionamiento comercial: “Acá compro tranquilo”.

## Envíos configurados

- Envíos a todo el país por Correo Argentino.
- Entrega en el día en 47 localidades cargadas en el proyecto.
- Corte a las 12:00 de Buenos Aires; antes se muestra el tiempo restante y después “Llega mañana”.
- La lista muestra solamente nombres de localidades, sin precios.
- Actualmente la interfaz comunica “Envío gratis”. La política definitiva y un posible monto mínimo todavía deben confirmarse con el dueño antes de cambiarla.

## Estado funcional

- Catálogo, detalle de producto, filtros, favoritos y navegación están implementados.
- Carrito y favoritos se guardan localmente en el navegador.
- WhatsApp está configurado con el número comercial real.
- Pago, cupón, inicio de sesión, cálculo real de Correo Argentino y gestión real de stock todavía no tienen integración de servidor.
- Para una primera versión comercial segura se recomienda cerrar el pedido por WhatsApp o integrar una plataforma de cobro y logística confirmada.

## Mejoras pendientes ya detectadas

1. Convertir el carrito en un pedido completo enviado por WhatsApp o integrar un checkout real.
2. Corregir el cálculo de “Llega hoy/mañana” para fines de semana y feriados.
3. Revisar fotografías y especificaciones antes de publicar cada producto.
4. Evitar secciones repetidas de productos destacados y novedades.
5. Ocultar categorías vacías o cargar productos reales.
6. Definir garantía exacta, medios de pago, comprobantes, horario de atención y cambios.
7. Optimizar el peso de las fotografías grandes para mejorar la carga en celulares.
8. Reducir la altura de la portada en celular para mostrar productos antes.

## Regla de trabajo

Toda información nueva entregada por el dueño reemplaza a la anterior. Separar siempre datos confirmados, datos proporcionados, estimaciones y datos pendientes de verificación. No publicar supuestos ocultos.
