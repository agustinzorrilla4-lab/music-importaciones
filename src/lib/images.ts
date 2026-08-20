// Un producto sin foto usa un degradé de marca como reemplazo, escrito en
// `images` con el formato "RRGGBB,RRGGBB". Cualquier otro valor se trata como
// una imagen real: ruta pública, URL o dato incrustado.
const GRADIENT_PATTERN = /^[0-9a-fA-F]{6},[0-9a-fA-F]{6}$/;

export function isGradientPlaceholder(source: string): boolean {
  return GRADIENT_PATTERN.test(source.trim());
}

export function hasPhoto(source: string | undefined): boolean {
  return Boolean(source) && !isGradientPlaceholder(source as string);
}
