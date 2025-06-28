"use client";

import { useState, useRef } from "react";
import { categoriesArray } from "../lib/data";

export default function Categories({
  onCategorySelectionAction,
}: {
  onCategorySelectionAction: (category: string | null) => void;
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleCategoryClick(category: string | null) {
    setActiveCategory(category);
    onCategorySelectionAction(category);

    // Si se selecciona "Todas", se limpia la categoría activa
    if (category === null && containerRef.current) {
      containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }

  return (
    <div ref={containerRef} className="flex items-center w-full overflow-x-auto gap-2">
      {/* 🔹 Botón "Todas" fijo */}
      <button
        onClick={() => handleCategoryClick(null)}
        className={`sticky left-0 px-4 py-2 rounded whitespace-nowrap ${
          activeCategory === null ? "bg-blue-500 text-white" : "bg-red-600 text-white"
        }`}
      >
        Todas
      </button>

      {/* 🔹 Botones desplazables */}
      {categoriesArray.map((option) => (
        <button
          key={option.id}
          onClick={() => handleCategoryClick(option.name)}
          className={`px-4 py-2 rounded whitespace-nowrap ${
            activeCategory === option.name ? "bg-blue-500 text-white" : "bg-red-600 text-white"
          }`}
        >
          {option.name}
        </button>
      ))}
    </div>
  );
}
