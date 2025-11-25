"use client";

import { useEffect } from "react";
import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

export default function MobileMenu({
  isOpen,
  onClose,
  navItems,
}: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-white shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[rgb(184,10,52)] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg font-[var(--font-montserrat)]">
                T
              </span>
            </div>
            <span className="font-bold text-lg text-[rgb(35,30,30)] font-[var(--font-montserrat)]">
              TUMED
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close menu"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="p-4">
          {navItems.map((item) => (
            <div key={item.label} className="mb-2">
              <Link
                href={item.href}
                onClick={onClose}
                className="block py-3 px-4 text-[rgb(35,30,30)] hover:bg-[rgb(243,243,243)] hover:text-[rgb(184,10,52)] rounded-lg transition-colors font-medium"
              >
                {item.label}
              </Link>
              {item.dropdown && (
                <div className="ml-4 mt-1">
                  {item.dropdown.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      onClick={onClose}
                      className="block py-2 px-4 text-sm text-gray-600 hover:bg-[rgb(243,243,243)] hover:text-[rgb(184,10,52)] rounded-lg transition-colors"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <button className="w-full flex items-center justify-center gap-2 py-3 text-[rgb(35,30,30)] hover:bg-[rgb(243,243,243)] rounded-lg transition-colors mb-3">
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
            <span className="font-medium">Giriş Yap</span>
          </button>
          <button className="w-full bg-[rgb(184,10,52)] text-white py-3 rounded-full font-semibold hover:bg-[rgb(239,105,104)] transition-colors">
            Bağış
          </button>
        </div>
      </div>
    </div>
  );
}
