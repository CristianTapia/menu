"use client";

import { useState } from "react";
import { productArray } from "../lib/data";

export default function Products({
  onOrderClickAction,
  selectedCategory,
}: {
  onOrderClickAction: (
    productName: string,
    productPrice: number,
    productQuantity: number,
    productCategory: string
  ) => void;
  selectedCategory: string | null;
}) {
  const [plus, setPlus] = useState<Record<string, number>>({});

  // Filtrar productos por categoría
  const filteredDishes = selectedCategory
    ? productArray.filter((dish) => dish.category === selectedCategory)
    : productArray;

  function plusProd(id: string) {
    setPlus((prevPlus) => ({
      ...prevPlus,
      [id]: (prevPlus[id] || 0) + 1,
    }));
  }

  function minusProd(id: string) {
    setPlus((prevPlus) => ({
      ...prevPlus,
      [id]: Math.max((prevPlus[id] || 0) - 1, 0),
    }));
  }

  return (
    <div className="flex flex-col gap-y-4">
      {filteredDishes.map((option) => (
        <div key={option.id} className="bg-blue-500 text-white text-center grid grid-cols-2">
          <div className="p-5">{option.name}</div>

          <div className="p-5 grid grid-rows-2 items-center">
            <div>${option.price}</div>
            <div className="flex items-center justify-center gap-2">
              <button className="bg-yellow-400 text-black p-2" onClick={() => minusProd(option.id)}>
                -
              </button>
              <span className="p-2 border">{plus[option.id] || 0}</span>
              <button className="bg-yellow-400 text-black p-2" onClick={() => plusProd(option.id)}>
                +
              </button>
              <button
                className="bg-green-400 text-black p-2"
                onClick={() => {
                  if ((plus[option.id] || 0) > 0) {
                    onOrderClickAction(option.name, option.price, plus[option.id], option.category);
                  }
                }}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
