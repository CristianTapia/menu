import ClientMenu from "../ui/ClientMenu";

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL ?? "http://localhost:3000"}/api/products`, {
    next: { revalidate: 0 },
  });
  const products = await res.json();

  return <ClientMenu products={products} />;
}
