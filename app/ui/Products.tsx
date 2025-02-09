"use client";

import { useState } from "react";

export default function Products() {
  const productArray = [
    { id: "a1", name: "Papas", price: "5.000" },
    { id: "a2", name: "Lomo saltado", price: "10.000" },
    { id: "a3", name: "Chorrillana", price: "8.000" },
    { id: "a4", name: "Salmón", price: "12.000" },
    { id: "a5", name: "Atún", price: "6.000" },
    { id: "a6", name: "Atún", price: "6.000" },
    { id: "a7", name: "Atún", price: "6.000" },
    { id: "a8", name: "Atún", price: "6.000" },
    { id: "a9", name: "Atún", price: "6.000" },
    { id: "a10", name: "Atún", price: "6.000" },
    { id: "a11", name: "Final", price: "6.000" },
  ];

  const [add, setAdd] = useState<Record<string, number>>({});

  // Adding and removing the same product in each card
  function addProduct(id: string) {
    setAdd((prevAdd) => ({
      ...prevAdd,
      [id]: (prevAdd[id] || 0) + 1,
    }));
  }

  function removeProduct(id: string) {
    setAdd((prevAdd) => ({
      ...prevAdd,
      [id]: Math.max((prevAdd[id] || 0) - 1, 0),
    }));
  }

  // Showing the card
  return (
    <div className="flex flex-col gap-y-4">
      {productArray.map((option) => (
        <div
          key={option.id}
          className="bg-blue-500 text-white text-center grid grid-cols-2"
        >
          <div className="p-5">{option.name}</div>

          <div className="p-5 grid grid-rows-2 items-center">
            <div>${option.price}</div>
            <div className="flex items-center justify-center gap-2">
              <button
                className="bg-yellow-400 text-black p-2"
                onClick={() => removeProduct(option.id)}
              >
                -
              </button>
              <span className="p-2 border">{add[option.id] || 0}</span>
              <button
                className="bg-yellow-400 text-black p-2"
                onClick={() => addProduct(option.id)}
              >
                +
              </button>
              <button className="bg-green-400 text-black p-2">Order</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
