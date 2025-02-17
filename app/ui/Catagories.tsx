"use client";

import { categoriesArray } from "../lib/data";

export default function Categories() {
  return (
    <div className="flex gap-4 h-full">
      {categoriesArray.map((option) => (
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
