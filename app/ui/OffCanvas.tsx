"use client";

export default function OffCanvas({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Overlay - Cierra el menú si se hace clic afuera */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Menú Off-Canvas */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold">Menú</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            ✕
          </button>
        </div>
        <ul className="p-4 space-y-2">
          <li>
            <a href="#" className="block p-2 hover:bg-gray-100">
              Opción 1
            </a>
          </li>
          <li>
            <a href="#" className="block p-2 hover:bg-gray-100">
              Opción 2
            </a>
          </li>
          <li>
            <a href="#" className="block p-2 hover:bg-gray-100">
              Opción 3
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
