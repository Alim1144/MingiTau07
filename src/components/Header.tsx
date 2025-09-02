"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 bg-black/85 md:bg-gradient-to-b md:from-black/90 md:to-black/60 md:backdrop-blur border-b border-white/10">
      <Container className="h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="font-semibold text-lg text-white">Минги-Тау</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-200">
          <Link href="/catalog" className="hover:text-white">Ассортимент</Link>
          <a href="#how" className="hover:text-white">Как это работает</a>
          <a href="#contacts" className="hover:text-white">Контакты</a>
          <Link href="/admin"><Button>Админ</Button></Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-zinc-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="sr-only">Меню</span>
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </>
            )}
          </svg>
        </button>
      </Container>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={`md:hidden fixed inset-0 z-50 transition-[opacity] ${menuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-[85%] bg-black border-l border-white/10 shadow-xl transition-transform ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="p-4 space-y-2 text-base">
            <Link href="/catalog" className="block rounded-md px-3 py-3 text-zinc-100 hover:bg-white/10" onClick={() => setMenuOpen(false)}>Ассортимент</Link>
            <a href="#how" className="block rounded-md px-3 py-3 text-zinc-100 hover:bg-white/10" onClick={() => setMenuOpen(false)}>Как это работает</a>
            <a href="#contacts" className="block rounded-md px-3 py-3 text-zinc-100 hover:bg-white/10" onClick={() => setMenuOpen(false)}>Контакты</a>
            <Link href="/admin" className="block" onClick={() => setMenuOpen(false)}>
              <Button className="w-full">Админ</Button>
            </Link>
          </nav>
          <div className="p-4 text-xs text-zinc-400">© {new Date().getFullYear()} Минги-Тау</div>
        </div>
      </div>
    </header>
  );
}


