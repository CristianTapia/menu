"use client";

import { useState } from "react";
import Categories from "./Categories";
import Products from "./Products";
import { Product, Category } from "@/lib/types";

import { MapPinIcon } from "@heroicons/react/24/outline";
import { ShoppingCart } from "lucide-react";

export default function ClientMenu({ products, categories }: { products: Product[]; categories: Category[] }) {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-screen bg-[var(--color-background)]">
      {/* bg-[var(--color-surface)] --SACADO-- */}
      <div className="overflow-x-auto p-4 text-[var(--color-foreground)] ">
        <div className="items-center text-center text-lg font-bold pt-2">Menú</div>
        <Categories categories={categories} onCategorySelectionAction={setSelectedCategory} />
      </div>
      <main className="flex-1 overflow-y-auto p-4 min-h-0 bg-[var(--color-background)]">
        <Products products={products} selectedCategory={selectedCategory} />
      </main>
      <footer className="bg-[var(--color-primary)] text-center py-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4">
          <button
            type="button"
            aria-label="IAyuda"
            className="flex flex-col items-center text-white hover:text-gray-200"
          >
            <ShoppingCart className="h-6 w-6" aria-label="Producto añadido" />
            <span className="sr-only">Comanda</span>
          </button>
          <button
            type="button"
            aria-label="Ubicación"
            className="flex flex-col items-center text-white hover:text-gray-200"
          >
            <MapPinIcon className="h-6 w-6" />
            <span className="sr-only">Ubicación</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
