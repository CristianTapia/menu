"use client";

import { useState, useRef } from "react";
import { categoriesArray } from "../lib/data";

export default function Categories({
  onCategorySelectionAction,
}: {
  onCategorySelectionAction: (category: string | null) => void;
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  function handleCategoryClick(category: string | null) {
    setActiveCategory(category);
    onCategorySelectionAction(category);

    if (category !== null && scrollRef.current) {
      const btn = scrollRef.current.querySelector<HTMLButtonElement>(`[data-name="${category}"]`);
      if (btn) {
        btn.scrollIntoView({ behavior: "smooth", inline: "start" });
      }
    } else {
      // si es "Todas", volvemos al inicio
      scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
    }
  }

  return (
    <div className="flex items-center w-full py-2 px-2">
      {/* “Todas” fuera del scroll */}
      <button
        onClick={() => handleCategoryClick(null)}
        className={`
          flex-none px-4 py-2 whitespace-nowrap
          ${
            activeCategory === null
              ? "underline underline-offset-5 decoration-2 decoration-white-500 text-white-600"
              : "text-gray-500"
          }
        `}
      >
        Todas
      </button>

      {/* scroll-snap en el contenedor desplazable */}
      <div ref={scrollRef} className="flex-1 overflow-x-auto scrollbar-hide scroll-snap-x mandatory">
        <div className="flex items-center gap-2 px-2">
          {categoriesArray.map((opt) => (
            <button
              key={opt.id}
              data-name={opt.name}
              onClick={() => handleCategoryClick(opt.name)}
              className={`
                scroll-snap-start
                px-4 py-2 whitespace-nowrap
                ${
                  activeCategory === opt.name
                    ? "underline underline-offset-5 decoration-2 decoration-white-500 text-white-600"
                    : "text-gray-500"
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
