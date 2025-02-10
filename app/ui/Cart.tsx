"use client";
import { useState } from "react";
import OffCanvas from "./OffCanvas";

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // <div>
    //   <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
    //     Carrito
    //   </button>
    // </div>
    <div>
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Abrir Menú
        </button>

        {/* Off-Canvas Importado */}
        <OffCanvas isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </div>
  );
}
