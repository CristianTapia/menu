import ClientMenu from "../ui/ClientMenu";

export default async function Page() {
  const base = process.env.NEXT_PUBLIC_BASE_URL!;
  const res = await fetch(`${base}/api/products`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`Error cargando productos: ${res.status}`);
  const products = await res.json();
  return <ClientMenu products={products} />;
}
