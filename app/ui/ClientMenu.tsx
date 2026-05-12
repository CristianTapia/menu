"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Categories from "./Categories";
import Products from "./Products";
import ShareLocationButton from "./ShareLocationButton";
import OffCanvas from "./OffCanvas";
import AutoRefresh from "./AutoRefresh";
import { Product, Category, Highlight, MenuContext } from "@/lib/types";
import { ReceiptText, Plus, Minus } from "lucide-react";

function loadStoredCart(cartStorageKey: string) {
  if (typeof window === "undefined") return [];

  try {
    const storedCart = window.localStorage.getItem(cartStorageKey);
    if (!storedCart) return [];

    const parsedCart = JSON.parse(storedCart) as { product: Product; quantity: number }[];
    if (!Array.isArray(parsedCart)) return [];

    return parsedCart.filter(
      (item) =>
        item &&
        typeof item.quantity === "number" &&
        item.quantity > 0 &&
        item.product &&
        typeof item.product.id === "number"
    );
  } catch {
    return [];
  }
}

export default function ClientMenu({
  products,
  categories,
  highlights,
  context,
}: {
  products: Product[];
  categories: Category[];
  highlights: Highlight[];
  context?: MenuContext;
}) {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const cartStorageKey = useMemo(() => {
    const tenantScope = context?.tenantName?.trim() || "menu";
    const tableScope = context?.tableToken?.trim() || "general";

    return `menu-cart:${tenantScope}:${tableScope}`;
  }, [context?.tableToken, context?.tenantName]);
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>(() =>
    loadStoredCart(cartStorageKey)
  );

  const subTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cartItems]
  );
  const hasLocation = Boolean(context?.location);

  useEffect(() => {
    window.localStorage.setItem(cartStorageKey, JSON.stringify(cartItems));
  }, [cartItems, cartStorageKey]);

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
      <AutoRefresh intervalMs={Number(process.env.NEXT_PUBLIC_MENU_AUTO_REFRESH_MS ?? 15000)} />
      <header className="fixed inset-x-0 top-0 overflow-x-auto p-3 text-[var(--color-foreground)] bg-[rgb(var(--color-background-rgb)/0.92)] ">
        <div className="items-center text-center font-bold p-2">
          {context?.tenantName ? context.tenantName : "Menu"}
          {context?.tableLabel ? <div className="text-xs font-medium opacity-70 mt-1">{context.tableLabel}</div> : null}
        </div>
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
        <div className={`max-w-4xl mx-auto h-full grid gap-4 ${hasLocation ? "grid-cols-2" : "grid-cols-1"}`}>
          <button
            type="button"
            aria-label="Comanda"
            onClick={() => setIsOffCanvasOpen(true)}
            className="flex flex-col items-center"
          >
            <ReceiptText className="h-6 w-6 text-[var(--color-category)]" aria-label="Producto agregado" />
            <span className="pt-1 text-xs font-extrabold text-[var(--color-category)]">¿Qué pedí?</span>
          </button>
          {context?.location ? (
            <div aria-label="Ubicacion" className="flex flex-col items-center">
              <ShareLocationButton
                name={context.location.name ?? context.tenantName ?? "Local"}
                lat={context.location.lat}
                lng={context.location.lng}
                address={context.location.address}
                mapsUrl={context.location.mapsUrl}
              />
            </div>
          ) : null}
        </div>
      </footer>
      <OffCanvas subTotal={subTotal} isOpen={isOffCanvasOpen} onCloseAction={() => setIsOffCanvasOpen(false)}>
        {cartItems.length === 0 ? (
          <div className="p-4 text-sm text-[var(--color-foreground)]">Tu comanda esta vacia</div>
        ) : (
          <div className="p-2 flex flex-col gap-3 text-sm text-[var(--color-foreground)]">
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3 pb-3 last:pb-0">
                {item.product.image_url ? (
                  <div className="w-12 h-12 overflow-hidden rounded-lg border border-[var(--color-border-box)]">
                    <Image
                      src={item.product.image_url}
                      alt={item.product.name}
                      width={48}
                      height={48}
                      unoptimized
                      className="w-full h-full object-cover"
                    />
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
                {/* Botones de cantidad */}
                <div className="flex font-bold items-center justify-center gap-3 rounded-full border border-[var(--color-border)] px-3 py-1">
                  <button onClick={() => handleRemoveFromCart(item.product)} className="text-[var(--color-primary)]">
                    <Minus size={14} />
                  </button>
                  <span className="w-3 text-center font-medium text-[var(--color-foreground)]">
                    {item.quantity}
                  </span>
                  <button onClick={() => handleAddToCart(item.product)} className="text-[var(--color-primary)]">
                    <Plus size={14} />
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
