"use client";

import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function ShoppingCart() {
  const [cart, setCart] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const products: Product[] = [
    { id: 1, name: "Producto A", price: 100 },
    { id: 2, name: "Producto B", price: 200 },
    { id: 3, name: "Producto C", price: 300 },
  ];

  // Cargar el carrito desde localStorage al iniciar
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Agregar producto al carrito
  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  // Eliminar producto del carrito por índice
  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  return (
    <div className="relative p-4">
      <h2 className="text-xl font-bold mb-4">Productos</h2>

      {/* Botones para agregar productos */}
      <div className="flex gap-4">
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => addToCart(product)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Agregar {product.name}
          </button>
        ))}
      </div>

      {/* Botón del Carrito con Dropdown */}
      <div className="mt-6 relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          🛒 Carrito ({cart.length})
        </button>

        {/* Dropdown del carrito */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
            <h3 className="font-semibold text-lg">Carrito de Compras</h3>
            {cart.length === 0 ? (
              <p className="text-gray-500">El carrito está vacío</p>
            ) : (
              <ul className="mt-2 space-y-2">
                {cart.map((item, index) => (
                  <li
                    key={index}
                    className="border-b py-2 flex justify-between items-center"
                  >
                    <span>
                      {item.name} - ${item.price}
                    </span>
                    <button
                      onClick={() => removeFromCart(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      ❌
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
