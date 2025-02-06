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
    <div className="flex gap-4 h-full">
      {optionsArray.map((option) => (
        <div
          key={option.id}
          className="justify-center flex items-center h-full"
        >
          {option.name}
        </div>
      ))}
    </div>
  );
}
