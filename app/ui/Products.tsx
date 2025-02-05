// "use client";

export default function Products() {
  const foodArray = [
    { id: "a1", name: "Papas", price: "5.000" },
    { id: "a2", name: "Lomo saltado", price: "10.000" },
    { id: "a3", name: "Chorrillana", price: "8.000" },
    { id: "a4", name: "Salmón", price: "12.000" },
    { id: "a5", name: "Atún", price: "6.000" },
    { id: "a6", name: "Atún", price: "6.000" },
    { id: "a7", name: "Atún", price: "6.000" },
    { id: "a8", name: "Atún", price: "6.000" },
    { id: "a9", name: "Atún", price: "6.000" },
    { id: "a10", name: "Atún", price: "6.000" },
  ];

  return (
    <div>
      {foodArray.map((option) => (
        <div
          key={option.id}
          className="mt-4 bg-blue-500 text-white text-center grid grid-cols-2"
        >
          <div className="p-5">{option.name}</div>
          <div className="p-5">{option.price}</div>
        </div>
      ))}
    </div>
  );
}
