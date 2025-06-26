"use client";

import { useState } from "react";
import Categories from "../ui/Catagories";
import Products from "../ui/Products";
// import OffCanvas from "../ui/OffCanvas";

export default function Menu() {
  // const [isOffCanvasOpen, setOffCanvasOpen] = useState(false); // Estado para abrir/cerrar el offcanvas
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // SUMA PRECIO DE TODOS LOS PRODUCTOS SELECCIONADOS
  // const grandTotalValue = selectedProducts.reduce((sum, product) => sum + product.price * product.quantity, 0);

  // AGREGAR PRODUCTOS AL OFFCANVAS
  // function addProdToCart(productName: string, productPrice: number, productQuantity: number, productCategory: string) {
  //   setSelectedProducts((prev) => {
  //     const exists = prev.find((p) => p.name === productName);

  //     return exists
  //       ? prev.map((p) => (p.name === productName ? { ...p, quantity: p.quantity + productQuantity } : p))
  //       : [
  //           ...prev,
  //           {
  //             name: productName,
  //             price: productPrice,
  //             quantity: productQuantity,
  //             category: productCategory,
  //           },
  //         ];
  //   });
  // }

  // ABRIR/CERRAR OFFCANVAS
  // function toggleOffCanvas() {
  //   setOffCanvasOpen((prev) => !prev);
  // }

  // MODAL

  return (
    <div className="grid grid-rows-[10%,80%,10%] h-screen">
      <div className="p-4 overflow-x-auto scrollbar-hide text-center grid place-items-center">
        <Categories onCategorySelectionAction={setSelectedCategory} />
      </div>
      <div className="p-4 overflow-y-auto">
        <Products selectedCategory={selectedCategory} />
      </div>

      <footer className="bg-red-700 text-center grid grid-cols-2 w-full items-center">
        <div className="text-sm">Sugerencias/reclamos</div>
        <div className="text-sm">Ubicación</div>
        {/* <div>Cuenta</div> */}
        {/* <div onClick={toggleOffCanvas}>Comanda</div> */}
      </footer>

      {/* <footer
        className="fixed bottom-0 left-0 right-0 z-50 bg-red-700 text-white text-center grid grid-cols-2 sm:grid-cols-4 items-center py-3 text-sm"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div>IA</div>
        <div>Atención</div>
        <div>Cuenta</div>
        <div onClick={toggleOffCanvas} className="cursor-pointer">
          Comanda
        </div>
      </footer> */}

      {/* OffCanvas con los productos seleccionados */}
      {/* <OffCanvas grandTotal={grandTotalValue} isOpen={isOffCanvasOpen} onCloseAction={toggleOffCanvas}>
        <div className="flex flex-col gap-4">
          {selectedProducts.map((product, index) => (
            <div className="p-4 bg-orange-600 gap-4" key={index}>
              {product.name} ${product.price} Cant. {product.quantity} Total: ${product.price * product.quantity}
            </div>
          ))}
        </div>
      </OffCanvas> */}
    </div>
  );
}
