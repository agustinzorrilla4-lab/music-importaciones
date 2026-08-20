import { Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Catalog from "@/pages/Catalog";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Favorites from "@/pages/Favorites";
import Account from "@/pages/Account";
import About from "@/pages/About";
import FAQ from "@/pages/FAQ";
import Shipping from "@/pages/Shipping";
import Payments from "@/pages/Payments";
import Warranty from "@/pages/Warranty";
import Returns from "@/pages/Returns";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-cyan focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-deep"
      >
        Saltar al contenido principal
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/producto/:slug" element={<ProductDetail />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/favoritos" element={<Favorites />} />
          <Route path="/cuenta" element={<Account />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/preguntas-frecuentes" element={<FAQ />} />
          <Route path="/envios" element={<Shipping />} />
          <Route path="/pagos" element={<Payments />} />
          <Route path="/garantia-y-cambios" element={<Warranty />} />
          <Route path="/cambios-devoluciones-y-reembolsos" element={<Returns />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/privacidad" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
