import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { visibleProducts as products } from "@/data/products";
import { activeCategories as categories, getCategoryName } from "@/data/categories";
import { formatPrice } from "@/lib/format";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";
import WhatsAppButton from "@/components/WhatsAppButton";
import type { StockStatus } from "@/types";

type SortOption = "relevancia" | "precio-asc" | "precio-desc" | "nombre";

const AVAILABILITY_OPTIONS: [StockStatus | "todos", string][] = [
  ["todos", "Todos"],
  ["in_stock", "En stock"],
  ["limited", "Últimas unidades"],
  ["on_request", "Consultar disponibilidad"],
  ["out_of_stock", "Sin stock"],
];

const pricedProducts = products.filter((p) => p.price !== undefined && !p.priceOnRequest);
const PRICE_MIN = pricedProducts.length ? Math.min(...pricedProducts.map((p) => p.price!)) : 0;
const PRICE_MAX = pricedProducts.length ? Math.max(...pricedProducts.map((p) => p.price!)) : 0;

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get("categoria") ?? "";
  const onlyOffers = searchParams.get("ofertas") === "1";
  const searchTerm = searchParams.get("buscar") ?? "";

  const [sort, setSort] = useState<SortOption>("relevancia");
  const [availability, setAvailability] = useState<StockStatus | "todos">("todos");
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [includeOnRequest, setIncludeOnRequest] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  function setCategory(slug: string) {
    const next = new URLSearchParams(searchParams);
    if (slug) {
      next.set("categoria", slug);
    } else {
      next.delete("categoria");
    }
    next.delete("ofertas");
    setSearchParams(next);
  }

  function resetFilters() {
    setAvailability("todos");
    setMaxPrice(PRICE_MAX);
    setIncludeOnRequest(true);
    setSort("relevancia");
    setSearchParams(new URLSearchParams());
  }

  const filtered = useMemo(() => {
    let list = [...products];

    if (categoryFilter) {
      list = list.filter((p) => p.category === categoryFilter);
    }
    if (onlyOffers) {
      list = list.filter((p) => p.badge === "oferta");
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.brand.toLowerCase().includes(term) ||
          p.shortDescription.toLowerCase().includes(term)
      );
    }
    if (availability !== "todos") {
      list = list.filter((p) => p.stock === availability);
    }
    list = list.filter((p) => {
      const hasPrice = p.price !== undefined && !p.priceOnRequest;
      if (!hasPrice) return includeOnRequest;
      return p.price! <= maxPrice;
    });

    switch (sort) {
      case "precio-asc":
      case "precio-desc": {
        const dir = sort === "precio-asc" ? 1 : -1;
        // Los productos a consultar no tienen precio comparable: van siempre al final.
        list.sort((a, b) => {
          const pa = a.priceOnRequest ? undefined : a.price;
          const pb = b.priceOnRequest ? undefined : b.price;
          if (pa === undefined && pb === undefined) return 0;
          if (pa === undefined) return 1;
          if (pb === undefined) return -1;
          return (pa - pb) * dir;
        });
        break;
      }
      case "nombre":
        list.sort((a, b) => a.name.localeCompare(b.name, "es"));
        break;
      default:
        break;
    }

    return list;
  }, [categoryFilter, onlyOffers, searchTerm, availability, maxPrice, includeOnRequest, sort]);

  const heading = onlyOffers
    ? "Ofertas"
    : categoryFilter
      ? getCategoryName(categoryFilter)
      : searchTerm
        ? `Resultados para "${searchTerm}"`
        : "Todos los productos";

  const filtersId = "catalogo-filtros";

  const filtersPanel = (
    <div className="space-y-8">
      <div>
        <h2 className="text-sm font-semibold text-ink">Categoría</h2>
        <div className="mt-3 flex flex-col gap-2 text-sm">
          <button
            type="button"
            onClick={() => setCategory("")}
            aria-pressed={!categoryFilter}
            className={`rounded-lg px-2 py-1 text-left transition-colors ${
              !categoryFilter ? "bg-cyan/10 font-semibold text-cyan" : "text-ink-soft hover:text-ink"
            }`}
          >
            Todas
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setCategory(cat.slug)}
              aria-pressed={categoryFilter === cat.slug}
              className={`rounded-lg px-2 py-1 text-left transition-colors ${
                categoryFilter === cat.slug
                  ? "bg-cyan/10 font-semibold text-cyan"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              <span aria-hidden="true">{cat.icon}</span> {cat.name}
            </button>
          ))}
        </div>
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-ink">Disponibilidad</legend>
        <div className="mt-3 flex flex-col gap-2 text-sm">
          {AVAILABILITY_OPTIONS.map(([value, label]) => (
            <label key={value} className="flex cursor-pointer items-center gap-2 text-ink-soft">
              <input
                type="radio"
                name="availability"
                checked={availability === value}
                onChange={() => setAvailability(value)}
                className="accent-cyan"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      {PRICE_MAX > PRICE_MIN && (
        <div>
          <h2 className="text-sm font-semibold text-ink">Precio</h2>
          <label htmlFor="precio-max" className="mt-3 block text-sm text-ink-soft">
            Hasta {formatPrice(maxPrice)}
          </label>
          <input
            id="precio-max"
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={5000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="mt-2 w-full accent-cyan"
          />
          <div className="mt-1 flex justify-between text-xs text-ink-faint">
            <span>{formatPrice(PRICE_MIN)}</span>
            <span>{formatPrice(PRICE_MAX)}</span>
          </div>
          <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
            <input
              type="checkbox"
              checked={includeOnRequest}
              onChange={(e) => setIncludeOnRequest(e.target.checked)}
              className="accent-cyan"
            />
            Incluir productos a consultar
          </label>
        </div>
      )}

      <button type="button" onClick={resetFilters} className="btn-outline w-full">
        Limpiar filtros
      </button>
    </div>
  );

  return (
    <div className="container-page section animate-fade-in">
      <div className="mb-8">
        <p className="eyebrow">Catálogo</p>
        <h1 className="mt-1 text-2xl font-bold text-ink sm:text-3xl">{heading}</h1>
        <p className="mt-1 text-sm text-ink-soft" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
        </p>
      </div>

      <button
        type="button"
        onClick={() => setFiltersOpen((v) => !v)}
        aria-expanded={filtersOpen}
        aria-controls={filtersId}
        className="btn-secondary mb-4 w-full lg:hidden"
      >
        {filtersOpen ? "Ocultar filtros" : "Mostrar filtros"}
      </button>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside id={filtersId} className={`${filtersOpen ? "block" : "hidden"} lg:block`}>
          {filtersPanel}
        </aside>

        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-ink-soft">
              Mostrando {filtered.length} de {products.length} productos
            </p>
            <label htmlFor="orden" className="flex items-center gap-2 text-sm text-ink-soft">
              Ordenar por
              <select
                id="orden"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="input w-auto py-2"
              >
                <option value="relevancia">Relevancia</option>
                <option value="precio-asc">Menor precio</option>
                <option value="precio-desc">Mayor precio</option>
                <option value="nombre">Nombre</option>
              </select>
            </label>
          </div>

          {filtered.length === 0 ? (
            <div className="space-y-4">
              <EmptyState
                icon="🔍"
                title="No encontramos productos"
                description="Probá ajustar los filtros o buscar con otras palabras. También podés escribirnos y te decimos si lo conseguimos."
                actionLabel="Ver todo el catálogo"
                actionTo="/catalogo"
              />
              <div className="text-center">
                <WhatsAppButton
                  className="btn-whatsapp"
                  message="Hola, estoy buscando un producto que no encontré en el catálogo. ¿Me pueden ayudar?"
                >
                  Consultar por WhatsApp
                </WhatsAppButton>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
