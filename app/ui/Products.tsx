"use client";

import Modal from "./Modals/Modal";
import { useState } from "react";
import Image from "next/image";
import { Product, Highlight } from "@/lib/types";
import { Info, ShoppingBasket } from "lucide-react";

export default function Products({
  products,
  highlights,
  selectedCategory,
}: {
  products: Product[];
  highlights: Highlight[];
  selectedCategory: number | null;
}) {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [activeModal, setActiveModal] = useState<null | "viewProduct">(null);

  const sortedProducts = selectedCategory
    ? products.filter((product) => product.category?.id === selectedCategory)
    : products;

  function openModal(modalName: "viewProduct", productId?: number) {
    setActiveModal(modalName);
    setSelectedProductId(productId ?? null);
  }

  function closeModal() {
    setActiveModal(null);
    setSelectedProductId(null);
  }

  const selectedProduct = products.find((p) => p.id === selectedProductId);
  return (
    <div className="flex flex-col gap-y-2 pb-5">
      <div className={`${highlights.length ? "" : "pt-20"} p-2 text-lg text-[var(--color-foreground)] mb-2`}>
        {highlights.length ? (
          <section className="pt-25">
            <h1 className="pb-3 font-bold">Destacados</h1>

            {/* Carrusel 1-por-scroll con Tailwind + Scroll Snap */}
            <div
              className="overflow-x-auto snap-x snap-mandatory scroll-smooth w-full scrollbar-hide"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <div className="flex">
                {highlights.map((highlight) => (
                  <article key={highlight.id} className="snap-center snap-always shrink-0 basis-full w-full px-2">
                    {highlight.image_url ? (
                      <Image
                        src={highlight.image_url}
                        alt={highlight.id.toString()}
                        width={1200}
                        height={800}
                        unoptimized
                        loading="lazy"
                        className="w-full h-40 sm:h-56 object-cover rounded-xl"
                      />
                    ) : (
                      <div className="w-full h-40 sm:h-56 border rounded-xl border-gray-300 grid place-items-center text-xs">
                        Sin foto
                      </div>
                    )}
                    <p className="mt-2 text-sm text-[var(--color-category)]">{highlight.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </div>

      {sortedProducts.map((product) => (
        <div key={product.id} className="p-2 flex flex-row gap-2 items-start">
          {/* Foto */}
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              width={96}
              height={96}
              unoptimized
              className="w-24 h-24 object-cover rounded-xl border flex-none shrink-0"
            />
          ) : (
            <div className="w-24 h-24 flex-none shrink-0 border border-gray-300 rounded-xl flex items-center justify-center text-xs">
              Sin foto
            </div>
          )}
          <div className="flex flex-col gap-2 items-start flex-1 min-w-0 text-xs">
            {/* Nombre */}
            <div className="font-semibold line-clamp-2">{product.name}</div>
            {/* Descripción */}
            <div className="text-[var(--color-dish)] line-clamp-3">{product.description}</div>
            {/* Info extra */}
            <div className="text-[var(--color-dish)]">Popular</div>
            {/* Precio */}
            <div className="font-extrabold text-[var(--color-primary)]">
              {new Intl.NumberFormat("es-CL", {
                style: "currency",
                currency: "CLP",
                minimumFractionDigits: 0,
              }).format(product.price)}
            </div>
          </div>
          <div className="flex flex-col gap-2 ml-auto items-center justify-between h-14">
            <button
              className="items-center rounded-full p-1 bg-[var(--color-primary)] shrink-0"
              aria-label="Añadir a la orden"
            >
              <ShoppingBasket color="white" size={16} />
            </button>
            <button
              onClick={() => {
                openModal("viewProduct", product.id);
              }}
              className="order-last"
              aria-label="Más información"
            >
              <Info color="#EA2831" size={20} />
            </button>
          </div>
        </div>
      ))}

      {/* Modal único fuera del map */}
      <Modal
        isOpen={activeModal === "viewProduct"}
        onCloseAction={closeModal}
        title={selectedProduct?.name ?? "Producto"}
        body={
          selectedProduct ? (
            <div className="flex flex-col gap-2 text-sm text-gray-800">
              <div>
                <strong>Categoría:</strong> {selectedProduct.category.name}
              </div>
              <div>
                <strong>Precio:</strong>{" "}
                {new Intl.NumberFormat("es-CL", {
                  style: "currency",
                  currency: "CLP",
                  minimumFractionDigits: 0,
                }).format(selectedProduct.price)}
              </div>
              <div>
                <strong>Descripción:</strong> {selectedProduct.description ?? "Sin descripción"}
              </div>
            </div>
          ) : null
        }
        buttonAName="Cerrar"
        onButtonAClickAction={closeModal}
      />
    </div>
  );
}
