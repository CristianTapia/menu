"use client";

export default function Modal({
  isOpen,
  onCloseAction,
  title,
  body,
  fixedBody,
  buttonAName,
  onButtonAClickAction,
  buttonBName,
  onButtonBClickAction,
}: {
  isOpen: boolean;
  onCloseAction: () => void;
  title?: string;
  body?: React.ReactNode;
  fixedBody?: React.ReactNode;
  buttonAName?: string;
  buttonBName?: string;
  onButtonAClickAction?: () => void;
  onButtonBClickAction?: () => void;
}) {
  return (
    <>
      {isOpen && (
        // Cierra el modal al hacer clic fuera
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/60 transition-opacity"
          onClick={onCloseAction}
        >
          {/* Evita que el click dentro del modal lo cierre */}
          <div className="bg-white p-6 rounded-lg w-96" onClick={(e) => e.stopPropagation()}>
            {/* Modal header */}
            <div className="flex pl-4 pb-6 justify-between text-xl">
              <h2 className="text-gray-900">{title}</h2>
              <button className="pr-4 text-gray-900 cursor-pointer" onClick={onCloseAction}>
                X
              </button>
            </div>
            {/* Modal body scrolleable*/}
            <div className="p-4 max-h-[70vh] overflow-y-auto">{body}</div>
            {/* Model Body fijo */}
            <div className="p-4">{fixedBody}</div>
            {/* Modal footer */}
            <div className="pt-4 pl-4">
              {buttonAName && (
                <button onClick={onButtonAClickAction} className="p-2 bg-green-400 text-white rounded cursor-pointer">
                  {buttonAName}
                </button>
              )}

              {buttonBName && (
                <button
                  onClick={onButtonBClickAction}
                  className="p-2 bg-red-600 text-white rounded ml-2 cursor-pointer"
                >
                  {buttonBName}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
