import Categories from "../ui/Catagories";
import Products from "../ui/Products";
import AddToCart from "../ui/AddToCart";

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
          <AddToCart />
        </div>
      </footer>
    </div>
  );
}
