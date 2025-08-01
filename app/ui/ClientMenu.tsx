"use client";

import { useState } from "react";
import Categories from "./Categories";
import Products from "./Products";

import { ChatBubbleLeftEllipsisIcon, MapPinIcon } from "@heroicons/react/24/outline";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description?: string;
}

interface Category {
  id: number;
  name: string;
}

export default function ClientMenu({ products, categories }: { products: Product[]; categories: Category[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="overflow-x-auto p-4 bg-[var(--color-surface)] text-[var(--color-foreground)] shadow-md z-10 ">
        <Categories categories={categories} onCategorySelectionAction={setSelectedCategory} />
      </div>
      <main className="flex-1 overflow-y-auto p-4 min-h-0 bg-[#F2F2F2]">
        <Products products={products} selectedCategory={selectedCategory} />
      </main>
      <footer className="bg-[var(--color-primary)] text-center py-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4">
          <button
            type="button"
            aria-label="IAyuda"
            className="flex flex-col items-center text-white hover:text-gray-200"
          >
            <ChatBubbleLeftEllipsisIcon className="h-6 w-6" />
            <span className="sr-only">IAyuda</span>
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
