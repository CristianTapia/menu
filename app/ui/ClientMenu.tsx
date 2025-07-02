"use client";

import { useState } from "react";
import Categories from "./Categories";
import Products from "./Products";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description?: string;
}

export default function ClientMenu({ products }: { products: Product[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-screen">
      <div className="overflow-x-auto scrollbar-hide p-4 bg-white">
        <Categories onCategorySelectionAction={setSelectedCategory} />
      </div>
      <main className="flex-1 overflow-y-auto p-4 min-h-0 bg-gray-50">
        <Products products={products} selectedCategory={selectedCategory} />
      </main>
      <footer className="bg-green-400 text-center py-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4">
          <span className="text-sm">Sugerencias/reclamos</span>
          <span className="text-sm">Ubicación</span>
        </div>
      </footer>
    </div>
  );
}
