import Categories from "../ui/Catagories";
import Products from "../ui/Products";

export default function Menu() {
  return (
    <div className="flex-col justify-center items-center h-screen">
      <Categories />
      <Products />
      <footer className="bg-red-700 text-center grid grid-cols-4 py-4 bottom-0 fixed w-full">
        <div>Menú</div>
        <div>Atención</div>
        <div>Cuenta</div>
        <div>AI</div>
      </footer>
    </div>
  );
}
