"use client";

import { useState } from "react";
import { categoriesArray } from "../lib/data";

export default function Categories({
  onCategorySelectionAction,
}: {
  onCategorySelectionAction: (category: string | null) => void;
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  function handleCategoryClick(category: string | null) {
    setActiveCategory(category);
    onCategorySelectionAction(category);
  }
  return (
    <div className="flex gap-4 h-full">
      {/* Botón para mostrar todos los productos */}
      <button
        onClick={() => handleCategoryClick(null)}
        className={`px-4 py-2 rounded ${activeCategory === null ? "bg-blue-500 text-white" : "#DC2626"}`}
      >
        Todas
      </button>

      {categoriesArray.map((option) => (
        <button
          key={option.id}
          onClick={() => handleCategoryClick(option.name)}
          className={`px-4 py-2 rounded ${activeCategory === option.name ? "bg-blue-500 text-white" : "#DC2626"}`}
        >
          {option.name}
        </button>
      ))}
    </div>
  );
}
