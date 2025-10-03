"use client";

import Modal from "./Modals/Modal";
import { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/types";
import { Info, ShoppingCart } from "lucide-react";

export default function Products({
  products,
  selectedCategory,
}: {
  products: Product[];
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
    <div className="flex flex-col gap-y-4">
      <div className="rounded p-4 flex flex-row sm:grid-cols-3 gap-2">
        <div className="w-24 h-24 border border-gray-300 rounded-xl flex items-center justify-center text-sm">Foto</div>
        <div className="flex flex-col gap-2 items-start">
          <div className="text-sm font-semibold">Nombre</div>
          <div className="text-xs text-[var(--color-dish)]">Descripción</div>
          <div className="text-xs text-[var(--color-dish)]">Popular</div>
          <div className="text-xs font-extrabold text-[var(--color-primary)]">Precio</div>
        </div>
        <div className="flex flex-row gap-2 ml-auto">
          <button className="place-items-center" aria-label="Más información">
            <Info color="#EA2831" size={20} />
          </button>
          <button className="items-center rounded p-1 bg-[var(--color-primary)]" aria-label="Añadir a la orden">
            <ShoppingCart color="white" size={20} />
          </button>
        </div>
      </div>
      {sortedProducts.map((product) => (
        <div key={product.id} className="rounded p-4 flex flex-col sm:grid-cols-3 gap-4">
          {/* Foto */}
          <div className="flex items-center justify-center">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                width={96}
                height={96}
                className="w-24 h-24 object-cover rounded border"
                unoptimized
              />
            ) : (
              <div className="w-24 h-24 border border-gray-300 rounded flex items-center justify-center text-sm">
                Sin foto
              </div>
            )}
          </div>

          {/* Nombre + Precio */}
          <div className="flex flex-col justify-center items-center sm:items-start gap-2">
            <div className="text-lg font-semibold">{product.name}</div>
            <div className="text-base">
              {new Intl.NumberFormat("es-CL", {
                style: "currency",
                currency: "CLP",
                minimumFractionDigits: 0,
              }).format(product.price)}
            </div>
          </div>

          <button
            className="bg-green-400 text-black px-3 py-1 rounded"
            onClick={() => {
              openModal("viewProduct", product.id);
            }}
          >
            Ver info
          </button>
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
