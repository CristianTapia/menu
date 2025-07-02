"use client";

import Modal from "./Modals/Modal";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description?: string;
}

export default function Products({
  products,
  selectedCategory,
}: {
  products: Product[];
  selectedCategory: string | null;
}) {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [activeModal, setActiveModal] = useState<null | "viewProduct">(null);

  const sortedProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
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
      {sortedProducts.map((product) => (
        <div
          key={product.id}
          className="shadow-xl/10 border border-gray-300 rounded p-4 flex flex-col  sm:grid-cols-3 gap-4"
        >
          {/* Foto */}
          <div className="flex items-center justify-center">
            <div className="w-24 h-24 border border-gray-300 rounded flex items-center justify-center text-sm">
              Foto
            </div>
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
                <strong>Categoría:</strong> {selectedProduct.category}
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
