"use client";

import { useState, useRef } from "react";

interface Category {
  id: number;
  name: string;
}

export default function Categories({
  categories,
  onCategorySelectionAction,
}: {
  categories: Category[];
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
    <div className="flex items-center w-full">
      {/* scroll-snap en el contenedor desplazable */}
      <div ref={scrollRef} className="flex-1 overflow-x-auto no-scrollbar">
        <div className="flex items-center px-2">
          <button
            onClick={() => handleCategoryClick(null)}
            className={`
          flex-none whitespace-nowrap pr-2 py-2
          ${
            activeCategory === null
              ? "underline underline-offset-5 decoration-2 decoration-white-500 text-white-600"
              : "text-gray-500"
          }
        `}
          >
            Todas
          </button>
          {categories.map((opt) => (
            <button
              key={opt.id}
              data-name={opt.name}
              onClick={() => handleCategoryClick(opt.name)}
              className={`
                scroll-snap-start
                px-2 py-2 whitespace-nowrap
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
