import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logoAsset from "@/assets/tiba-logo.asset.json";

const NAV = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#destinos", label: "Destinos" },
  { href: "#como-funciona", label: "Como Funciona" },
  { href: "#contactos", label: "Contactos" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-xl shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between py-3">
        <a href="#top" className="flex items-center gap-2">
          <img src={logoAsset.url} alt="TIBA" className="h-12 w-auto sm:h-14" />
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`text-sm font-medium transition-colors ${
                scrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="tel:+244921122000"
            className={`hidden items-center gap-2 text-sm font-semibold md:flex ${
              scrolled ? "text-primary" : "text-white"
            }`}
          >
            <Phone className="h-4 w-4" /> +244 921 122 000
          </a>
          <a
            href="#orcamento"
            className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-md transition hover:brightness-110 md:inline-flex"
          >
            Orçamento
          </a>
          <button
            onClick={() => setOpen(true)}
            className={`lg:hidden ${scrolled ? "text-foreground" : "text-white"}`}
            aria-label="Abrir menu"
          >
            <Menu className="h-7 w-7" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 bg-primary/95 backdrop-blur-xl">
          <div className="container-x flex items-center justify-between py-4">
            <img src={logoAsset.url} alt="TIBA" className="h-12 w-auto brightness-0 invert" />
            <button onClick={() => setOpen(false)} aria-label="Fechar menu" className="text-white">
              <X className="h-7 w-7" />
            </button>
          </div>
          <nav className="container-x mt-12 flex flex-col gap-6">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="text-2xl font-semibold text-white"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#orcamento"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full bg-accent px-6 py-3 text-center font-semibold text-accent-foreground"
            >
              Solicitar Orçamento
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
