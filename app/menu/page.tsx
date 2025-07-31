import ClientMenu from "../ui/ClientMenu";
import { headers } from "next/headers";

export default async function Page() {
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const base = `${protocol}://${host}`;

  const res = await fetch(`${base}/api/products`, {
    next: { revalidate: 10 },
  });
  const products = await res.json();

  const catRes = await fetch(`${base}/api/categories`, {
    next: { revalidate: 10 },
  });
  const categories = await catRes.json();

  return <ClientMenu products={products} categories={categories} />;
}
