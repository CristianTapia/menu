import Categories from "../ui/Catagories";
import Products from "../ui/Products";
import ShoppingCart from "../ui/ShoppingCart";

export default function Menu() {
  return (
    <div className="grid grid-rows-[10%,80%,10%] h-screen">
      <div className="p-4 overflow-x-auto scrollbar-hide text-center bg-red-600">
        <Categories />
      </div>
      <div className="p-4 overflow-y-auto">
        <Products />
      </div>
      <footer className="bg-red-700 text-center grid grid-cols-4 w-full items-center">
        <div>Menú</div>
        <div>Atención</div>
        <div>Cuenta</div>
        <div>
          <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <h1 className="text-2xl font-bold mb-4">Tienda Online</h1>
            <ShoppingCart /> {/* Usa el carrito aquí */}
          </div>
        </div>
      </footer>
    </div>
  );
}
