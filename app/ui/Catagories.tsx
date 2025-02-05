"use client";

export default function Categories() {
  const optionsArray = [
    { id: "c1", name: "Vinos" },
    { id: "c2", name: "Comidas" },
    { id: "c3", name: "Pizzas" },
    { id: "c4", name: "Hamburguesas" },
    { id: "c5", name: "Aperitivos" },
    { id: "c6", name: "Chorrillanas" },
    { id: "c7", name: "Papas" },
  ];

  return (
    <div className="overflow-x-auto scrollbar-hide text-center bg-red-600">
      <div className="flex gap-4">
        {optionsArray.map((option) => (
          <div key={option.id} className="h-20 flex items-center">
            {option.name}
          </div>
        ))}
      </div>
    </div>
  );
}
