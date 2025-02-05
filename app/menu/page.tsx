import Food from "../ui/food";
import HorizontalScroll from "../ui/horizontalScroll";

export default function Menu() {
  return (
    <div className="flex-col justify-center items-center h-screen">
      <HorizontalScroll />
      <Food />
    </div>
  );
}
