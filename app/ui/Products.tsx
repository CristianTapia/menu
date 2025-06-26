"use client";

import { productArray } from "../lib/data";
import Modal from "./Modals/Modal";
import { useState } from "react";

export default function Products({
  // onOrderClickAction,
  selectedCategory,
}: {
  // onOrderClickAction?: (
  //   productName: string,
  //   productPrice: number,
  //   productQuantity: number,
  //   productCategory: string
  // ) => void;
  selectedCategory: string | null;
}) {
  // const [plus, setPlus] = useState<Record<string, number>>({});

  const [products] = useState(productArray);
  // const [selectedProducts, setSelectedProducts] = useState<
  //   { name: string; price: number; quantity: number; category: string }[]
  // >([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  // const selectedProduct = products.find((product) => product.id === selectedProductId);
  const [activeModal, setActiveModal] = useState<null | "viewProduct">(null);

  // Filtrar productos por categoría
  const filteredDishes = selectedCategory
    ? productArray.filter((dish) => dish.category === selectedCategory)
    : productArray;

  function openModal(modalName: "viewProduct", productId?: number) {
    setActiveModal(modalName);
    setSelectedProductId(productId ?? null);
  }

  function closeModal() {
    setActiveModal(null);
  }

  // function plusProd(id: string) {
  //   setPlus((prevPlus) => ({
  //     ...prevPlus,
  //     [id]: (prevPlus[id] || 0) + 1,
  //   }));
  // }

  // function minusProd(id: string) {
  //   setPlus((prevPlus) => ({
  //     ...prevPlus,
  //     [id]: Math.max((prevPlus[id] || 0) - 1, 0),
  //   }));
  // }

  return (
    <div className="flex flex-col gap-y-4">
      {filteredDishes.map((option) => (
        <div
          key={option.id}
          className="bg-blue-500 text-white rounded shadow p-4 flex flex-col sm:grid sm:grid-cols-3 gap-4"
        >
          {/* Foto */}
          <div className="flex items-center justify-center">
            <div className="w-24 h-24 bg-white border border-gray-300 rounded text-black flex items-center justify-center text-sm">
              Foto
            </div>
          </div>

          {/* Nombre + Precio */}
          <div className="flex flex-col justify-center items-center sm:items-start gap-2">
            <div className="text-lg font-semibold">{option.name}</div>
            <div className="text-base">
              {new Intl.NumberFormat("es-CL", {
                style: "currency",
                currency: "CLP",
                minimumFractionDigits: 0,
              }).format(option.price)}
            </div>
          </div>

          <button
            className="bg-green-400 text-black px-3 py-1 rounded"
            onClick={() => {
              openModal("viewProduct", option.id);
              // if ((plus[option.id] || 0) > 0) {
              //   onOrderClickAction(option.name, option.price, plus[option.id], option.category);
              // }
            }}
          >
            Ver info
          </button>

          <Modal
            isOpen={activeModal === "viewProduct"}
            onCloseAction={closeModal}
            title="test"
            body="asdfkjasdf"
            buttonAName="Salir"
            onButtonAClickAction={closeModal}
          />

          {/* + - Controles */}
          {/* <div className="flex flex-wrap justify-center items-center gap-2">
            <button className="bg-yellow-400 text-black px-3 py-1 rounded" onClick={() => minusProd(option.id)}>
              -
            </button>
            <span className="px-3 py-1 border rounded bg-white text-black">{plus[option.id] || 0}</span>
            <button className="bg-yellow-400 text-black px-3 py-1 rounded" onClick={() => plusProd(option.id)}>
              +
            </button>
            <button
              className="bg-green-400 text-black px-3 py-1 rounded"
              onClick={() => {
                if ((plus[option.id] || 0) > 0) {
                  onOrderClickAction(option.name, option.price, plus[option.id], option.category);
                }
              }}
            >
              Enviar
            </button>
          </div> */}
        </div>
      ))}
    </div>
  );
}
