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

  function addProduct(id: string) {
    setAdd((prevAdd) => ({
      ...prevAdd,
      [id]: (prevAdd[id] || 0) + 1,
    }));
  }

  return (
    <div className="flex flex-col gap-y-4">
      {productArray.map((option) => (
        <div
          key={option.id}
          className="bg-blue-500 text-white text-center grid grid-cols-2"
        >
          <div className="p-5">{option.name}</div>

          <div className="p-5">
            <p>{option.price}</p>
            <button
              className="bg-yellow-400 text-black"
              onClick={() => addProduct(option.id)}
            >
              + {add[option.id] || 0}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
