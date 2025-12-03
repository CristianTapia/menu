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

  function handleCategoryClick(id: number | null, btn?: HTMLButtonElement | null) {
    setActiveCategory(id);
    onCategorySelectionAction(id);

    if (btn && id !== null) {
      btn.scrollIntoView({ behavior: "smooth", inline: "start" });
    } else if (scrollRef.current && id === null) {
      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }

  return (
    <div className="flex items-center w-full font-bold text-sm">
      {/* scroll-snap en el contenedor desplazable */}
      <div ref={scrollRef} className="flex-1 overflow-x-auto no-scrollbar snap-x snap-mandatory">
        <div className="flex items-center">
          <button
            onClick={() => handleCategoryClick(null)}
            className={`flex-none snap-start whitespace-nowrap p-2 ${
              activeCategory === null
                ? "underline underline-offset-10 decoration-2 decoration-[var(--color-primary)] text-[var(--color-primary)]"
                : "text-[var(--color-category)]"
            }
            `}
          >
            Todas
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={(e) => handleCategoryClick(category.id, e.currentTarget)}
              className={`snap-start whitespace-nowrap p-2 ${
                activeCategory === category.id
                  ? "underline underline-offset-10 decoration-2 decoration-[var(--color-primary)] text-[var(--color-primary)]"
                  : "text-[var(--color-category)]"
              }
              `}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
