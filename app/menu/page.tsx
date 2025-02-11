"use client";

import { useState } from "react";

import Categories from "../ui/Catagories";
import Products from "../ui/Products";
import Cart from "../ui/Cart";

export default function Menu() {
  const [selectedProducts, setSelectedProducts] = useState<
    { name: string; quantity: number }[]
  >([]);

  function addProdToCart(productName: string, quantity: number) {
    return setSelectedProducts((prev) => [
      ...prev,
      { name: productName, quantity },
    ]);
  }

  return (
    <div className="grid grid-rows-[10%,80%,10%] h-screen">
      <div className="p-4 overflow-x-auto scrollbar-hide text-center bg-red-600">
        <Categories />
      </div>
      <div className="p-4 overflow-y-auto">
        <Products onOrderClick={addProdToCart} />
        <div>
          <h2>Productos Seleccionados:</h2>
          <div>
            {selectedProducts.map((product, index) => (
              <p key={index}>
                {product.name} (x{product.quantity})
              </p>
            ))}
          </div>
        </div>
      </div>
      <footer className="bg-red-700 text-center grid grid-cols-4 w-full items-center">
        <div>Menú</div>
        <div>Atención</div>
        <div>Cuenta</div>
        <div>
          <Cart />
        </div>
      </footer>
    </div>
  );
}
