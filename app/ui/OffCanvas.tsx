"use client";

import { type ReactNode } from "react";
import { X } from "lucide-react";

export default function OffCanvas({
  subTotal,
  isOpen,
  onCloseAction,
  children,
}: {
  subTotal: number;
  isOpen: boolean;
  onCloseAction: () => void;
  children: ReactNode; // Acepta contenido dinamico (productos seleccionados)
}) {
  const formattedSubTotal = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  }).format(subTotal);

  const formattedTip = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  }).format(subTotal * 0.1);

  const formattedGrandTotal = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  }).format(subTotal + subTotal * 0.1);

  return (
    <div>
      {/* Overlay - Cierra el menu si se hace clic afuera */}
      {isOpen && <div className="fixed inset-0 bg-black/60 transition-opacity" onClick={onCloseAction} />}

      {/* Menu Off-Canvas */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[var(--color-surface)] text-[var(--color-foreground)] shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 flex flex-col`}
      >
        {/* Cabecera fija */}
        <div className="p-4 flex justify-between border-b border-[var(--color-border-box)]">
          <h2 className="text-md font-bold">Resumen</h2>
          <button onClick={onCloseAction} className="text-[var(--color-category)]">
            <X size={24} />
          </button>
        </div>

        {/* Contenedor con scroll */}
        <div className="flex-1 overflow-y-auto p-2">{children}</div>

        {/* Footer para ordenar */}
        <footer className="flex flex-col gap-3 text-sm justify-between border-t border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-6">
          <div className="flex justify-between">
            <p className="text-[var(--color-muted)]">Subtotal</p>
            <p>{formattedSubTotal}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[var(--color-muted)]">Propina sugerida (10%)</p>
            <p>{formattedTip}</p>
          </div>
          <div className="flex justify-between font-bold">
            <p className="font-semibold text-[var(--color-foreground)]">Total</p>
            <p className="font-bold text-[var(--color-primary)]">{formattedGrandTotal}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
