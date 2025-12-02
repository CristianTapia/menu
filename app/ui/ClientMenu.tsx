"use client";

import { useState } from "react";
import Categories from "./Categories";
import Products from "./Products";
import ShareLocationButton from "./ShareLocationButton";
import { Product, Category, Highlight } from "@/lib/types";
import { ReceiptText, MapPin } from "lucide-react";

export default function ClientMenu({
  products,
  categories,
  highlights,
}: {
  products: Product[];
  categories: Category[];
  highlights: Highlight[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  return (
    <div className="flex flex-col bg-[var(--color-background)]">
      <header className="fixed inset-x-0 top-0 overflow-x-auto p-3 text-[var(--color-foreground)] bg-[rgb(var(--color-background-rgb)/0.92)] ">
        <div className="items-center text-center text-lg font-bold p-2">Menú</div>
        <Categories categories={categories} onCategorySelectionAction={setSelectedCategory} />
      </header>
      <main className="pb-[calc(4rem+env(safe-area-inset-bottom))] overflow-y-auto p-4 bg-[var(--color-background)] mt-25">
        <Products products={products} selectedCategory={selectedCategory} highlights={highlights} />
      </main>
      <footer className="fixed inset-x-0 bottom-0 border-t border-[var(--color-primary)] bg-[rgb(var(--color-background-rgb)/0.95)] text-center py-4">
        <div className="max-w-4xl mx-auto h-full grid grid-cols-2 gap-4">
          <div aria-label="Comanda" className="flex flex-col items-center">
            <ReceiptText color="#21111199" className="h-6 w-6" aria-label="Producto añadido" />
            <span className="pt-1 text-xs font-extrabold text-[var(--color-category)]">¿Qué pedí?</span>
          </div>
          <div aria-label="Ubicación" className="flex flex-col items-center">
            <ShareLocationButton
              name="Local de Comidas"
              lat={-33.4489}
              lng={-70.6693}
              address="Av. Siempre Viva 123, Santiago"
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
