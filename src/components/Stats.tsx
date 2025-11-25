"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const partners = [
    {
      id: 1,
      name: "Partner 1",
      logo: "https://picsum.photos/150/60?random=20&grayscale",
    },
    {
      id: 2,
      name: "Partner 2",
      logo: "https://picsum.photos/150/60?random=21&grayscale",
    },
    {
      id: 3,
      name: "Partner 3",
      logo: "https://picsum.photos/150/60?random=22&grayscale",
    },
    {
      id: 4,
      name: "Partner 4",
      logo: "https://picsum.photos/150/60?random=23&grayscale",
    },
    {
      id: 5,
      name: "Partner 5",
      logo: "https://picsum.photos/150/60?random=24&grayscale",
    },
    {
      id: 6,
      name: "Partner 6",
      logo: "https://picsum.photos/150/60?random=25&grayscale",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && count < 200) {
      const timer = setTimeout(() => {
        setCount((prev) => Math.min(prev + 4, 200));
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [isVisible, count]);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Counter */}
        <div className="text-center mb-16">
          <div className="inline-flex flex-col items-center">
            <span className="text-6xl sm:text-7xl lg:text-8xl font-bold text-[rgb(184,10,52)] font-[var(--font-montserrat)]">
              {count}+
            </span>
            <p className="text-xl sm:text-2xl text-[rgb(35,30,30)] mt-4 font-medium">
              İş birliği yaptığımız kurumlar
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[rgb(184,10,52)]/30 to-transparent mb-16" />

        {/* Partners */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={48}
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[rgb(184,10,52)]/30 to-transparent mt-16" />
      </div>
    </section>
  );
}
