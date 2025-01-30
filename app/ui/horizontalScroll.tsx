"use client";

export default function HorizontalScroll() {
  return (
    <div className="h-screen flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Scroll Horizontal</h1>
      <div className="w-full max-w-4xl overflow-x-auto whitespace-nowrap border rounded-lg p-4 scrollbar-hide">
        <div className="flex space-x-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="w-40 h-40 flex items-center justify-center bg-gray-200 rounded-lg shadow hover:bg-gray-300 transition"
            >
              Item {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
