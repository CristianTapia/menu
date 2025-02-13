"use client";

import { useState } from "react";
import { productArray } from "../lib/data";

export default function Products({
  onOrderClickAction,
}: {
  onOrderClickAction: (productName: string, productPrice: number, productQuantity: number) => void;
}) {
  const [plus, setPlus] = useState<Record<string, number>>({});

  // Additioning and subtracting the same product in each card
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

  // Showing the card
  return (
    <div className="flex flex-col gap-y-4">
      {productArray.map((option) => (
        <div key={option.id} className="bg-blue-500 text-white text-center grid grid-cols-2">
          <div className="p-5">{option.name}</div>

          <div className="p-5 grid grid-rows-2 items-center">
            <div>${option.price}</div>
            <div className="flex items-center justify-center gap-2">
              <button className="bg-yellow-400 text-black p-2" onClick={() => minusProd(option.id)}>
                -
              </button>
              <span className="p-2 border">{plus[option.id] || 0}</span>
              <button
                className="bg-yellow-400 text-black p-2"
                onClick={() => {
                  plusProd(option.id);
                }}
              >
                +
              </button>
              <button
                className="bg-green-400 text-black p-2"
                onClick={() => {
                  if ((plus[option.id] || 0) > 0) {
                    onOrderClickAction(option.name, option.price, plus[option.id]);
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
