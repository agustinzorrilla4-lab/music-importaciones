import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { activeCategories as categories } from "@/data/categories";
import { useCart } from "@/context/CartContext";
import { asset } from "@/lib/asset";
import WhatsAppButton from "./WhatsAppButton";

export default function Header() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const { totalItems, favorites } = useCart();
  const navigate = useNavigate();

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    navigate(query.trim() ? `/catalogo?buscar=${encodeURIComponent(query)}` : "/catalogo");
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-surface/95 backdrop-blur">
      <div className="container-page flex h-16 items-center gap-4">
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink hover:bg-white/10 lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <span aria-hidden="true">{menuOpen ? "✕" : "☰"}</span>
        </button>

        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src={asset("/brand/logo-192.png")}
            alt="Logo de Music Importaciones"
            className="h-10 w-10 rounded-xl object-cover shadow-soft"
            width={40}
            height={40}
            loading="eager"
          />
          <span className="hidden text-base font-bold text-ink sm:block">
            Music Importaciones
          </span>
        </Link>

        <form
          onSubmit={handleSearch}
          className="hidden flex-1 items-center md:flex"
          role="search"
        >
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar celulares, audio, gaming y más..."
            className="input"
            aria-label="Buscar productos"
          />
        </form>

        <nav className="ml-auto flex items-center gap-1 sm:gap-2">
          <WhatsAppButton className="btn-whatsapp hidden sm:inline-flex" />
          <Link
            to="/favoritos"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-ink hover:bg-white/10"
            aria-label={`Favoritos${favorites.length > 0 ? ` (${favorites.length})` : ""}`}
          >
            <span aria-hidden="true">♡</span>
            {favorites.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-magenta text-[10px] font-bold text-white">
                {favorites.length}
              </span>
            )}
          </Link>
          <Link
            to="/carrito"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-ink hover:bg-white/10"
            aria-label={`Carrito${totalItems > 0 ? ` (${totalItems} productos)` : ""}`}
          >
            <span aria-hidden="true">🛒</span>
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-gradient text-[10px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>

      <form onSubmit={handleSearch} className="container-page pb-3 md:hidden" role="search">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar productos..."
          className="input"
          aria-label="Buscar productos"
        />
      </form>

      <div className="hidden border-t border-white/10 bg-surface-soft/60 lg:block">
        <nav aria-label="Categorías" className="container-page flex items-center gap-6 overflow-x-auto py-2.5 text-sm font-medium text-ink-soft">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/catalogo?categoria=${cat.slug}`}
              className="whitespace-nowrap transition-colors hover:text-cyan"
            >
              {cat.name}
            </Link>
          ))}
        </nav>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-white/10 bg-surface lg:hidden">
          <nav aria-label="Menú principal" className="container-page flex flex-col gap-1 py-3 text-sm font-medium text-ink">
            <button
              type="button"
              className="flex items-center justify-between py-2 text-left"
              onClick={() => setCategoriesOpen((v) => !v)}
              aria-expanded={categoriesOpen}
              aria-controls="mobile-categories"
            >
              Categorías
              <span aria-hidden="true">{categoriesOpen ? "−" : "+"}</span>
            </button>
            {categoriesOpen && (
              <div id="mobile-categories" className="flex flex-col gap-1 pb-2 pl-3">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/catalogo?categoria=${cat.slug}`}
                    className="py-1.5 text-ink-soft hover:text-cyan"
                    onClick={() => setMenuOpen(false)}
                  >
                    {cat.icon} {cat.name}
                  </Link>
                ))}
              </div>
            )}
            <WhatsAppButton className="btn-whatsapp mt-2 w-full" />
          </nav>
        </div>
      )}
    </header>
  );
}
