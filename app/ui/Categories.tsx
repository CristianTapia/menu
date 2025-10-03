"use client";

import { useState, useRef } from "react";
import { Category } from "@/lib/types";

export default function Categories({
  categories,
  onCategorySelectionAction,
}: {
  categories: Category[];
  onCategorySelectionAction: (category: number | null) => void;
}) {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  function handleCategoryClick(id: number | null) {
    setActiveCategory(id);
    onCategorySelectionAction(id);

    if (id !== null && scrollRef.current) {
      const btn = scrollRef.current.querySelector<HTMLButtonElement>(`[data-name="${id}"]`);
      if (btn) {
        btn.scrollIntoView({ behavior: "smooth", inline: "start" });
      }
    } else {
      // si es "Todas", volvemos al inicio
      scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
    }
  }

  return (
    <div className="flex items-center w-full p-4">
      {/* scroll-snap en el contenedor desplazable */}
      <div ref={scrollRef} className="flex-1 overflow-x-auto no-scrollbar">
        <div className="flex items-center px-2">
          <button
            onClick={() => handleCategoryClick(null)}
            className={`
          flex-none whitespace-nowrap pr-2 py-2
          ${
            activeCategory === null
              ? "underline underline-offset-5 decoration-2 decoration-white-500 text-[#EA2831]"
              : "text-[var(--color-category)]"
          }
        `}
          >
            Todas
          </button>
          {categories.map((opt) => (
            <button
              key={opt.id}
              data-id={opt.id}
              onClick={() => handleCategoryClick(opt.id)}
              className={`
                scroll-snap-start
                px-2 py-2 whitespace-nowrap
                ${
                  activeCategory === opt.id
                    ? "underline underline-offset-5 decoration-2 decoration-white-500 text-[#EA2831]"
                    : "text-[var(--color-category)]"
                }
              `}
            >
              {opt.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
