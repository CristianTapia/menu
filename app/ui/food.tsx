// "use client";

export default function Food() {
  const foodArray = [
    "Product 1",
    "Product 2",
    "Product 3",
    "Product 4",
    "Product 5",
  ];

  return (
    <div className="mt-4 bg-blue-500 text-white text-center grid grid-cols-2">
      <div className="p-5">Lado A</div>
      <div className="p-5">Lado B</div>
    </div>
  );
}
