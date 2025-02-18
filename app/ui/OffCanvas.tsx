"use client";

export default function OffCanvas({
  isOpen,
  onCloseAction,
  children,
}: {
  isOpen: boolean;
  onCloseAction: () => void;
  children: React.ReactNode; // Acepta contenido dinámico (productos seleccionados)
}) {
  return (
    <>
      {/* Overlay - Cierra el menú si se hace clic afuera */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onCloseAction} />}

      {/* Menú Off-Canvas */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 flex flex-col`}
      >
        {/* Cabecera fija */}
        <div className="p-4 flex justify-between border-b">
          <h2 className="text-red-600 text-lg font-semibold">Comanda</h2>
          <button onClick={onCloseAction} className="text-red-600">
            ✕
          </button>
        </div>

        {/* Contenedor con scroll */}
        <div className="flex-1 overflow-y-auto p-2">{children}</div>

        {/* Footer para ordenar */}
        <div className="flex p-4 items-center justify-center">
          <div className="text-red-800">Total: falta sumar</div>
          <button className="bg-black p-4 ml-auto">Pedir</button>
        </div>
      </div>
    </>
  );
}
