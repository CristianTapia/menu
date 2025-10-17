"use client";

import Modal from "./Modals/Modal";
import { useState } from "react";
import Image from "next/image";
import { Product, Highlight } from "@/lib/types";
import { Info, ShoppingCart } from "lucide-react";

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
      <div className="fp-2 pt-25 text-lg text-[var(--color-foreground)] mb-2">
        <section>
          <h1 className="pb-3 font-bold">Destacados</h1>
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
            {highlights.map((highlight) => (
              <div key={highlight.id} className="snap-start shrink-0 w-64 rounded-xl overflow-hidden">
                {highlight.image_url ? (
                  <Image
                    src={highlight.image_url}
                    alt={highlight.id.toString()}
                    width={96}
                    height={96}
                    unoptimized
                    loading="lazy"
                    className="w-full h-30 flex items-center justify-center text-xs"
                  />
                ) : (
                  <div className="w-full h-30 border rounded-xl border-gray-300 flex items-center justify-center text-xs">
                    Sin foto
                  </div>
                )}
                <p className="p-2 text-sm text-[var(--color-category)]">{highlight.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      {sortedProducts.map((product) => (
        <div key={product.id} className="p-2 flex flex-row sm:grid-cols-3 gap-2">
          {/* Foto */}
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              width={96}
              height={96}
              unoptimized
              className="w-24 h-24 object-cover rounded-xl border"
            />
          ) : (
            <div className="w-24 h-24 border border-gray-300 rounded-xl flex items-center justify-center text-xs">
              Sin foto
            </div>
          )}
          <div className="flex flex-col gap-2 items-start">
            {/* Nombre */}
            <div className="text-sm font-semibold">{product.name}</div>
            {/* Descripción */}
            <div className="text-xs text-[var(--color-dish)]">{product.description}</div>
            {/* Info extra */}
            <div className="text-xs text-[var(--color-dish)]">Popular</div>
            {/* Precio */}
            <div className="text-xs font-extrabold text-[var(--color-primary)]">
              {new Intl.NumberFormat("es-CL", {
                style: "currency",
                currency: "CLP",
                minimumFractionDigits: 0,
              }).format(product.price)}
            </div>
          </div>
          <div className="flex flex-row gap-2 ml-auto">
            <button
              onClick={() => {
                openModal("viewProduct", product.id);
              }}
              className="place-items-center"
              aria-label="Más información"
            >
              <Info color="#EA2831" size={20} />
            </button>
            <button className="items-center rounded p-1 bg-[var(--color-primary)]" aria-label="Añadir a la orden">
              <ShoppingCart color="white" size={20} />
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
