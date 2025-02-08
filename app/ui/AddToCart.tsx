"use client";
import { useState } from "react";

export default function AddToCart() {
  function addToCart() {
    setAdd(add + 1);
  }

  const [add, setAdd] = useState(0);

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={addToCart}
      >
        Carrito ({add})
      </button>
    </div>
  );
}
