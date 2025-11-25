"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Anasayfa", href: "/" },
    {
      label: "Hakkımızda",
      href: "#hakkimizda",
      dropdown: [
        { label: "Kurumsal", href: "#kurumsal" },
        { label: "Yönetim Kurulu", href: "#yonetim" },
        { label: "Tarihçe", href: "#tarihce" },
      ],
    },
    { label: "Mezunlar", href: "#mezunlar" },
    {
      label: "Faaliyetler",
      href: "#faaliyetler",
      dropdown: [
        { label: "Etkinlikler", href: "#etkinlikler" },
        { label: "Projeler", href: "#projeler" },
        { label: "Ziyaretler", href: "#ziyaretler" },
      ],
    },
    { label: "İletişim", href: "#iletisim" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-lg py-2"
            : "bg-white/95 backdrop-blur-sm py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-[rgb(184,10,52)] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl font-[var(--font-montserrat)]">
                    T
                  </span>
                </div>
                <div className="hidden sm:block">
                  <span className="font-bold text-xl text-[rgb(35,30,30)] font-[var(--font-montserrat)]">
                    TUMED
                  </span>
                  <p className="text-xs text-gray-500">
                    Türkiye Mezunları Derneği
                  </p>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() =>
                    item.dropdown && setActiveDropdown(item.label)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="text-[rgb(35,30,30)] hover:text-[rgb(184,10,52)] transition-colors font-medium flex items-center gap-1"
                  >
                    {item.label}
                    {item.dropdown && (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </Link>
                  {item.dropdown && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-100">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-[rgb(35,30,30)] hover:bg-[rgb(243,243,243)] hover:text-[rgb(184,10,52)] transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Login Button */}
              <button className="hidden sm:flex items-center gap-2 text-[rgb(35,30,30)] hover:text-[rgb(184,10,52)] transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="text-sm font-medium">Giriş Yap</span>
              </button>

              {/* Donate Button */}
              <button className="bg-[rgb(184,10,52)] text-white px-6 py-2 rounded-full font-semibold hover:bg-[rgb(239,105,104)] transition-colors text-sm">
                Bağış
              </button>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <svg
                  className="w-6 h-6 text-[rgb(35,30,30)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
      />
    </>
  );
}
