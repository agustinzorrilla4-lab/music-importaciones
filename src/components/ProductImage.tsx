import { isGradientPlaceholder } from "@/lib/images";
import { asset } from "@/lib/asset";

interface ProductImageProps {
  source: string; // ruta pública de imagen o "COLOR1,COLOR2" para fallback
  label: string;
  className?: string;
  // Marcar como true solo para la imagen principal visible sin scroll
  // (hero, primera imagen de la ficha de producto).
  priority?: boolean;
}

export default function ProductImage({
  source,
  label,
  className = "",
  priority = false,
}: ProductImageProps) {
  const isImage = !isGradientPlaceholder(source);
  const [from = "28D7FF", to = "8B4DFF"] = source.split(",");

  // Fondo levemente gris: las fotos con fondo blanco no se funden con la tarjeta.
  if (isImage) {
    return (
      <div className={`overflow-hidden bg-[#f2f4f7] ${className}`}>
        <img
          src={asset(source)}
          alt={label}
          className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-[1.03]"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(135deg, #${from} 0%, #${to} 100%)`,
      }}
      role="img"
      aria-label={label}
    >
      <span className="px-4 text-center text-sm font-medium text-white/90">
        Imagen a incorporar<br />
        <span className="text-xs text-white/75">{label}</span>
      </span>
    </div>
  );
}
