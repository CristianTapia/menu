// app/menu/page.tsx
import ClientMenu from "../ui/ClientMenu";
import { Product, Highlight } from "@/lib/types";

export default async function Page() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

  // TRAER CATEGORÍAS, PRODUCTOS Y DESTACADOS DESDE LA API
  const [catRes, prodRes, highRes] = await Promise.all([
    fetch(`${base}/api/categories`, { cache: "no-store" }),
    fetch(`${base}/api/products`, { cache: "no-store" }),
    fetch(`${base}/api/highlights`, { cache: "no-store" }),
  ]);

  if (!catRes.ok) throw new Error("Error categorías");
  if (!prodRes.ok) throw new Error("Error products");
  if (!highRes.ok) throw new Error("Error highlights");

  const categories: Array<{ id: number; name: string }> = await catRes.json();
  const products: Product[] = await prodRes.json(); // debe incluir image_url
  const highlights: Highlight[] = await highRes.json(); // debe incluir image_url

  return <ClientMenu products={products} categories={categories} highlights={highlights} />;
}
