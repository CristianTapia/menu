"use client";

import { useState } from "react";

import Categories from "../ui/Catagories";
import Products from "../ui/Products";
import Cart from "../ui/Cart";

export default function Menu() {
  const [selectedProducts, setSelectedProducts] = useState<{ name: string; price: number; quantity: number }[]>([]);

  function addProdToCart(productName: string, productPrice: number, productQuantity: number) {
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
            },
          ];
    });
  }

  return (
    <div className="grid grid-rows-[10%,80%,10%] h-screen">
      <div className="p-4 overflow-x-auto scrollbar-hide text-center bg-red-600">
        <Categories />
      </div>
      <div className="p-4 overflow-y-auto">
        <Products onOrderClickAction={addProdToCart} />
        <div>
          <h2>Productos Seleccionados:</h2>
          <div className="flex flex-col gap-4">
            {selectedProducts.map((product, index) => (
              <div className="p-4 bg-orange-600 gap-4" key={index}>
                Nombre: {product.name} Precio: {product.price} Cantidad: {product.quantity} Total:{" "}
                {product.price * product.quantity}
              </div>
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
