"use client";

export default function HorizontalScroll() {
  const optionsArray = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
    "Option 6",
    "Option 7",
  ];

  return (
    // <div className="h-screen flex flex-col items-center p-6">
    <div className="w-full max-w-4xl overflow-x-auto whitespace-nowrap border rounded-lg p-4 scrollbar-hide">
      <div className="flex space-x-4">
        {optionsArray.map((options) => (
          <div
            key={options}
            className="w-40 h-40 flex items-center justify-center bg-red-200 rounded-lg"
          >
            {options}
          </div>
        ))}
      </div>
    </div>
    // </div>
  );
}
