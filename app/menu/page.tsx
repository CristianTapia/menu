"use client";

import { useState } from "react";
import Categories from "../ui/Catagories";
import Products from "../ui/Products";
import OffCanvas from "../ui/OffCanvas";

export default function Menu() {
  const [selectedProducts, setSelectedProducts] = useState<
    { name: string; price: number; quantity: number; category: string }[]
  >([]);
  const [isOffCanvasOpen, setOffCanvasOpen] = useState(false); // Estado para abrir/cerrar el offcanvas
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // SUMA PRECIO DE TODOS LOS PRODUCTOS SELECCIONADOS
  const grandTotalValue = selectedProducts.reduce((sum, product) => sum + product.price * product.quantity, 0);

  // AGREGAR PRODUCTOS AL OFFCANVAS
  function addProdToCart(productName: string, productPrice: number, productQuantity: number, productCategory: string) {
    setSelectedProducts((prev) => {
      const exists = prev.find((p) => p.name === productName);

      return exists
        ? prev.map((p) => (p.name === productName ? { ...p, quantity: p.quantity + productQuantity } : p))
        : [
            ...prev,
            {
              name: productName,
              price: productPrice,
              quantity: productQuantity,
              category: productCategory,
            },
          ];
    });
  }

  // ABRIR/CERRAR OFFCANVAS
  function toggleOffCanvas() {
    setOffCanvasOpen((prev) => !prev);
  }

  return (
    <div className="grid grid-rows-[10%,80%,10%] h-screen">
      <div className="p-4 overflow-x-auto scrollbar-hide text-center bg-red-600">
        <Categories onCategorySelectionAction={setSelectedCategory} />
      </div>
      <div className="p-4 overflow-y-auto">
        <Products onOrderClickAction={addProdToCart} selectedCategory={selectedCategory} />
      </div>

      <footer className="bg-red-700 text-center grid grid-cols-4 w-full items-center">
        <div>IA</div>
        <div>Atención</div>
        <div>Cuenta</div>
        <div>
          <button onClick={toggleOffCanvas} className="mt-4 p-2 bg-blue-500 text-white">
            Comanda
          </button>
        </div>
      </footer>

      {/* OffCanvas con los productos seleccionados */}
      <OffCanvas grandTotal={grandTotalValue} isOpen={isOffCanvasOpen} onCloseAction={toggleOffCanvas}>
        <div className="flex flex-col gap-4">
          {selectedProducts.map((product, index) => (
            <div className="p-4 bg-orange-600 gap-4" key={index}>
              {product.name} ${product.price} Cant. {product.quantity} Total: ${product.price * product.quantity}
            </div>
          ))}
        </div>
      </OffCanvas>
    </div>
  );
}
