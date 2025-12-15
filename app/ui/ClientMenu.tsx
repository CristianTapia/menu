"use client";

import { useMemo, useState } from "react";
import Categories from "./Categories";
import Products from "./Products";
import ShareLocationButton from "./ShareLocationButton";
import OffCanvas from "./OffCanvas";
import { Product, Category, Highlight } from "@/lib/types";
import { ReceiptText } from "lucide-react";

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
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);

  const grandTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cartItems]
  );

  const formatCLP = (value: number) =>
    new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", minimumFractionDigits: 0 }).format(value);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.product.id === product.id);
      if (exists) {
        return prev.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsOffCanvasOpen(true);
  };

  const handleRemoveFromCart = (product: Product) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div className="flex flex-col bg-[var(--color-background)]">
      <header className="fixed inset-x-0 top-0 overflow-x-auto p-3 text-[var(--color-foreground)] bg-[rgb(var(--color-background-rgb)/0.92)] ">
        <div className="items-center text-center font-bold p-2">Menu</div>
        <Categories categories={categories} onCategorySelectionAction={setSelectedCategory} />
      </header>
      <main className="pb-[calc(4rem+env(safe-area-inset-bottom))] overflow-y-auto p-4 bg-[var(--color-background)] mt-25">
        <Products
          products={products}
          selectedCategory={selectedCategory}
          highlights={highlights}
          onAddToCart={handleAddToCart}
        />
      </main>
      <footer className="fixed inset-x-0 bottom-0 border-t border-[var(--color-primary)] bg-[rgb(var(--color-background-rgb)/0.95)] text-center py-4">
        <div className="max-w-4xl mx-auto h-full grid grid-cols-2 gap-4">
          <button
            type="button"
            aria-label="Comanda"
            onClick={() => setIsOffCanvasOpen(true)}
            className="flex flex-col items-center"
          >
            <ReceiptText color="#21111199" className="h-6 w-6" aria-label="Producto agregado" />
            <span className="pt-1 text-xs font-extrabold text-[var(--color-category)]">Que pedimos?</span>
          </button>
          <div aria-label="Ubicacion" className="flex flex-col items-center">
            <ShareLocationButton
              name="Local de Comidas"
              lat={-33.4489}
              lng={-70.6693}
              address="Av. Siempre Viva 123, Santiago"
            />
          </div>
        </div>
      </footer>
      <OffCanvas grandTotal={grandTotal} isOpen={isOffCanvasOpen} onCloseAction={() => setIsOffCanvasOpen(false)}>
        {cartItems.length === 0 ? (
          <div className="p-4 text-sm text-[var(--color-foreground)]">Tu comanda esta vacia</div>
        ) : (
          <div className="p-2 flex flex-col gap-3 text-sm text-[var(--color-foreground)]">
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3 pb-3 last:pb-0">
                {item.product.image_url ? (
                  <div className="w-12 h-12 overflow-hidden rounded-lg border border-[var(--color-border-box)]">
                    <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-lg border border-[var(--color-border-box)] grid place-items-center text-[10px]">
                    Sin foto
                  </div>
                )}
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <div className="font-semibold line-clamp-2">{item.product.name}</div>
                  <div className="text-[var(--color-dish)] text-xs">
                    {formatCLP(item.product.price * item.quantity)}
                  </div>
                </div>
                <div className="flex font-bold items-center justify-center gap-3 rounded-full border border-gray-200 px-3 py-1 dark:border-gray-700">
                  <button onClick={() => handleRemoveFromCart(item.product)} className="text-[var(--color-primary)]">
                    -
                  </button>
                  <span className="font-medium text-background-dark dark:text-background-light">{item.quantity}</span>
                  <button onClick={() => handleAddToCart(item.product)} className="text-[var(--color-primary)]">
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </OffCanvas>
    </div>
  );
}
