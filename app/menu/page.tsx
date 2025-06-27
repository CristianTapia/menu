"use client";

import { useState } from "react";
import Categories from "../ui/Catagories";
import Products from "../ui/Products";

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="grid grid-rows-[10%,80%,10%] h-screen">
      <div className="p-4 overflow-x-auto scrollbar-hide text-center grid place-items-center">
        <Categories onCategorySelectionAction={setSelectedCategory} />
      </div>
      <div className="p-4 overflow-y-auto">
        <Products selectedCategory={selectedCategory} />
      </div>

      <footer className="bg-red-700 text-center grid grid-cols-2 w-full items-center">
        <div className="text-sm">Sugerencias/reclamos</div>
        <div className="text-sm">Ubicación</div>
      </footer>
    </div>
  );
}
