# Music Importaciones — Tienda online (prototipo)

Prototipo de tienda online construido en **React + TypeScript + Tailwind CSS**,
con estética "Premium Tech" (blanco, gris muy claro, acentos cian/violeta/magenta).

Este proyecto es un **prototipo funcional** enfocado en experiencia visual y de
compra. No incluye todavía integraciones reales de pagos ni envíos — esos
puntos están marcados en el código y en la interfaz.

## Cómo correrlo

Necesitás [Node.js](https://nodejs.org) 18 o superior instalado.

```bash
npm install
npm run dev
```

Abrí la URL que te muestra la terminal (por defecto `http://localhost:5173`).

Para generar la build de producción:

```bash
npm run build
npm run preview
```

## Qué es editable y dónde

- **Productos**: `src/data/products.ts`. Cada campo marcado como "dato de
  ejemplo" o "a confirmar" debe reemplazarse por información real antes de
  publicar. Las imágenes son placeholders con degradé de color — reemplazalos
  por fotos reales del producto en `ProductImage` o cambiando `images` por
  URLs reales.
- **Categorías**: `src/data/categories.ts`.
- **Preguntas frecuentes**: `src/data/faq.ts`.
- **Número de WhatsApp**: `src/lib/format.ts`, función `whatsappLink` (cambiá
  el valor por defecto de `phone`).
- **Colores de marca**: `tailwind.config.ts`, sección `theme.extend.colors`.
- **Textos institucionales** (Nosotros, Envíos, Pagos, Garantía, Privacidad):
  cada archivo en `src/pages/*.tsx` correspondiente.
- **Redes sociales**: enlaces en `src/components/Footer.tsx`.

## Estructura

```
src/
  components/   Componentes reutilizables (Header, Footer, ProductCard, etc.)
  context/      Estado global del carrito y favoritos (persistido en localStorage)
  data/         Productos, categorías y preguntas frecuentes (fuente única de datos)
  lib/          Utilidades (formato de precios, link de WhatsApp)
  pages/        Una página por ruta
  types/        Tipos de TypeScript compartidos
```

## Pendiente para producción

- Integrar pasarela de pagos real (Mercado Pago u otra).
- Integrar cálculo real de envíos por código postal / transportista.
- Conectar el formulario de contacto a un servicio de email o CRM.
- Sistema de cuentas de usuario (login/registro real).
- Reemplazar precios, stock, cuotas y especificaciones de ejemplo por datos
  confirmados.
- Reemplazar imágenes placeholder por fotografías reales de producto.
