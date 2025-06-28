"use client";
import { useState } from "react";
import Categories from "../ui/Catagories";
import Products from "../ui/Products";

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-screen">
      {/* Header: categorías */}
      <div className="overflow-x-auto scrollbar-hide p-4">
        <Categories onCategorySelectionAction={setSelectedCategory} />
      </div>

      {/* Main: área de productos */}
      <main className="flex-1 overflow-y-auto p-4 min-h-0">
        <Products selectedCategory={selectedCategory} />
      </main>

      {/* Footer */}
      <footer className="bg-red-700 text-white text-center py-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4">
          <span className="text-sm">Sugerencias/reclamos</span>
          <span className="text-sm">Ubicación</span>
        </div>
      </footer>
    </div>
  );
}
