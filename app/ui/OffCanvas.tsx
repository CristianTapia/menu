// import { useState } from "react";
// import { X } from "lucide-react";
"use client";
import React from "react";

export default function OffCanvas() {
  function handleClick() {
    console.log("sumar");
    setSum(sum + 1);
  }

  const [sum, setSum] = React.useState(0);

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={handleClick}
      >
        Carrito {sum}
      </button>
    </div>
  );
}
