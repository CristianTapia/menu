import next from "next";
import ClientMenu from "../ui/ClientMenu";

export default async function Page() {
  const base = process.env.NEXT_PUBLIC_BASE_URL!;

  // Fetching products
  const res = await fetch(`${base}/api/products`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`Error cargando productos: ${res.status}`);
  const products = await res.json();

  // Fetching categories
  const categoriesRes = await fetch(`${base}/api/categories`, { next: { revalidate: 0 } });
  if (!categoriesRes.ok) throw new Error(`Error cargando categorías: ${categoriesRes.status}`);
  const categories = await categoriesRes.json();

  return <ClientMenu products={products} categories={categories} />;
}
