import { useCart } from "@/context/CartContext";
import { getProductById } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";

export default function Favorites() {
  const { favorites } = useCart();
  const products = favorites
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="container-page section">
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">Tus favoritos</h1>

      {products.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            icon="♡"
            title="Todavía no tenés favoritos"
            description="Guardá los productos que te interesan tocando el corazón en cada ficha."
            actionLabel="Ir al catálogo"
            actionTo="/catalogo"
          />
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
