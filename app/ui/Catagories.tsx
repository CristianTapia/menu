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
    // <div className="flex gap-4 h-full">
    //   <button
    //     onClick={() => handleCategoryClick(null)}
    //     className={`px-4 py-2 rounded ${activeCategory === null ? "bg-blue-500 text-white" : "#DC2626"}`}
    //   >
    //     Todas
    //   </button>

    //   {categoriesArray.map((option) => (
    //     <button
    //       key={option.id}
    //       onClick={() => handleCategoryClick(option.name)}
    //       className={`px-4 py-2 rounded ${activeCategory === option.name ? "bg-blue-500 text-white" : "#DC2626"}`}
    //     >
    //       {option.name}
    //     </button>
    //   ))}
    // </div>

    <div className="grid grid-cols-[auto_1fr] items-center w-full overflow-x-auto">
      {/* 🔹 Botón "Todas" fijo */}
      <div className="sticky left-0 z-10">
        <button
          onClick={() => handleCategoryClick(null)}
          className={`px-4 py-2 rounded ${
            activeCategory === null ? "bg-blue-500 text-white" : "bg-red-600 text-white"
          }`}
        >
          Todas
        </button>
      </div>

      {/* 🔹 Botones desplazables */}
      <div className="overflow-x-auto flex gap-4 pl-2">
        {categoriesArray.map((option) => (
          <button
            key={option.id}
            onClick={() => handleCategoryClick(option.name)}
            className={`px-4 py-2 rounded ${
              activeCategory === option.name ? "bg-blue-500 text-white" : "bg-red-600 text-white"
            }`}
          >
            {option.name}
          </button>
        ))}
      </div>
    </div>
  );
}
