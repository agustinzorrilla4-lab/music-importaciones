import { Link } from "react-router-dom";
import { activeCategories as categories } from "@/data/categories";
import { visibleProducts as products } from "@/data/products";
import { homeFaq } from "@/data/faq";
import ProductCard from "@/components/ProductCard";
import ProductImage from "@/components/ProductImage";
import TrustBar from "@/components/TrustBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import Accordion from "@/components/Accordion";
import { hasPhoto } from "@/lib/images";
import { asset } from "@/lib/asset";

const featured = products.slice(0, 4);
const heroProducts = products
  .filter((product) => product.category === "celulares" && hasPhoto(product.images[0]))
  .slice(0, 2);
export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Portada */}
      <section className="relative isolate overflow-hidden bg-deep text-ink">
        <div className="absolute -left-24 top-8 h-80 w-80 rounded-full bg-violet/30 blur-3xl" />
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-cyan/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-magenta/20 blur-3xl" />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(34,215,210,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(34,215,210,0.22)_1px,transparent_1px)] [background-size:42px_42px]" />

        <div className="container-page relative grid items-center gap-10 py-12 sm:py-16 lg:min-h-[620px] lg:grid-cols-[1.06fr_.94fr] lg:py-20">
          <div className="relative z-10">
            <div className="flex items-center gap-4">
              <div className="rounded-[1.7rem] border border-white/20 bg-[#002942]/70 p-1.5 shadow-[0_22px_70px_rgba(0,0,0,0.35)] backdrop-blur">
                <img
                  src={asset("/brand/logo-192.png")}
                  alt="Logo de Music Importaciones"
                  className="h-32 w-32 rounded-[1.35rem] object-contain sm:h-44 sm:w-44"
                  width={176}
                  height={176}
                  loading="eager"
                />
              </div>
              <p className="max-w-[13rem] text-xs font-bold uppercase leading-relaxed tracking-[0.18em] text-cyan sm:text-sm">
                Tecnología con identidad
              </p>
            </div>
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-cyan">
              Importación de audio y tecnología · Desde 2022
            </p>
            <h1 className="mt-3 max-w-2xl text-4xl font-extrabold leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
              Especificaciones <span className="text-cyan">verificadas</span>. Sin
              sorpresas.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              Publicamos el código de modelo, la memoria física y el contenido de la caja
              de cada producto. Más de 900 operaciones concretadas.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/catalogo" className="btn bg-cyan text-deep shadow-[0_12px_30px_rgba(34,215,210,0.25)] hover:-translate-y-0.5 hover:brightness-105 focus-visible:ring-cyan">
                Explorar productos
              </Link>
              <WhatsAppButton className="btn border border-white/25 bg-white/10 text-ink backdrop-blur hover:-translate-y-0.5 hover:bg-white/20 focus-visible:ring-cyan">
                Consultar por WhatsApp
              </WhatsAppButton>
            </div>
            <div className="mt-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-faint">Accesos rápidos</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/catalogo?categoria=${cat.slug}`}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-ink-soft transition-all hover:-translate-y-0.5 hover:border-cyan hover:bg-cyan/15 hover:text-cyan"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="absolute inset-6 rounded-[2.2rem] border border-cyan/35 bg-[#00263d]/80 shadow-[0_28px_75px_rgba(0,0,0,0.3)]" />
            <div className="relative overflow-hidden rounded-[2.2rem] border border-white/15 bg-[#00263d]/80 p-4 backdrop-blur sm:p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan">Tecnología destacada</p>
                <span className="h-2.5 w-2.5 rounded-full bg-violet shadow-[0_0_18px_#924AD8]" aria-label="Catálogo actualizado" />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-4">
                {heroProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/producto/${product.slug}`}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-white p-2 shadow-soft transition-transform hover:-translate-y-1"
                  >
                    <ProductImage
                      source={product.images[0]}
                      label={product.name}
                      priority
                      className="aspect-square rounded-xl"
                    />
                    <p className="line-clamp-2 px-2 pb-1 pt-3 text-center text-xs font-bold text-deep sm:text-sm">
                      {product.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="section container-page">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Elegidos para vos</p>
            <h2 className="mt-1 text-2xl font-bold text-ink sm:text-3xl">
              Productos destacados
            </h2>
          </div>
          <Link to="/catalogo" className="hidden text-sm font-semibold text-violet sm:block">
            Ver todo →
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Link to="/catalogo" className="mt-6 block text-center text-sm font-semibold text-violet sm:hidden">
          Ver todo →
        </Link>
      </section>

      <section className="section bg-surface-soft">
        <div className="container-page">
          <p className="eyebrow">Explorá por categoría</p>
          <h2 className="mt-1 text-2xl font-bold text-ink sm:text-3xl">
            Encontrá justo lo que buscás
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/catalogo?categoria=${cat.slug}`}
                className="card flex flex-col items-center gap-2 px-4 py-6 text-center transition-all hover:-translate-y-1 hover:border-cyan/40 hover:shadow-card"
              >
                <span className="text-3xl" aria-hidden="true">
                  {cat.icon}
                </span>
                <span className="text-sm font-semibold text-ink">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

<section className="section bg-deep" aria-labelledby="atencion">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-[2rem] border border-cyan/30 bg-brand-gradient p-8 shadow-[0_18px_44px_rgba(0,29,49,0.28)] sm:p-12">
            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border-[28px] border-lime/30" />
            <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">Atención personalizada</p>
                <h2 id="atencion" className="mt-2 max-w-xl text-3xl font-extrabold text-white sm:text-4xl">
                  Comprá con respaldo y consultas por WhatsApp.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85">
                  Envío gratis, entregas en el día en zonas habilitadas de lunes a viernes y despachos a todo el país por Correo Argentino. Te confirmamos disponibilidad, forma de pago y envío antes de cerrar el pedido.
                </p>
              </div>
              <WhatsAppButton
                className="btn shrink-0 bg-lime text-ink shadow-soft hover:-translate-y-0.5 hover:brightness-105 focus-visible:ring-lime"
                message="Hola, quiero consultar disponibilidad, formas de pago y envío en Music Importaciones."
              >
                Escribinos por WhatsApp
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-surface-soft">
        <div className="container-page">
          <p className="eyebrow">Confianza primero</p>
          <h2 className="mt-1 text-2xl font-bold text-ink sm:text-3xl">
            ¿Por qué comprar en Music Importaciones?
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Precios competitivos",
                text: "Buscamos que cada compra valga la pena, sin sorpresas.",
              },
              {
                title: "Productos identificados",
                text: "Cada ficha detalla claramente lo que estás comprando.",
              },
              {
                title: "Atención personalizada",
                text: "Te acompañamos por WhatsApp en todo el proceso.",
              },
              {
                title: "Garantía y respaldo",
                text: "Si algo no sale como esperabas, estamos para resolverlo.",
              },
            ].map((item) => (
              <div key={item.title} className="card p-6">
                <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section container-page">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow text-center">Antes de comprar</p>
          <h2 className="mt-1 text-center text-2xl font-bold text-ink sm:text-3xl">
            Preguntas frecuentes
          </h2>
          <div className="mt-8">
            <Accordion
              items={homeFaq.map((item) => ({
                title: item.question,
                content: item.answer,
              }))}
            />
          </div>
        </div>
      </section>

      <section className="section bg-brand-gradient-soft">
        <div className="container-page flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl font-bold text-ink sm:text-3xl">
            ¿Tenés una consulta? Escribinos por WhatsApp.
          </h2>
          <p className="max-w-lg text-sm text-ink-soft">
            Te ayudamos a elegir el producto justo para vos, antes de comprar.
          </p>
          <WhatsAppButton className="btn-whatsapp" />
        </div>
      </section>
    </div>
  );
}
