import ClientMenu from "@/app/ui/ClientMenu";
import { Category, Highlight, Product } from "@/lib/types";
import { notFound } from "next/navigation";

type PublicMenuResponse = {
  tenant: { id: string; name: string; domain: string | null };
  products: Product[];
};

export const dynamic = "force-dynamic";

export default async function TenantMenuPage({ params }: { params: { tenant: string } }) {
  const dashboardBase = process.env.NEXT_PUBLIC_DASHBOARD_API_URL ?? "http://localhost:3001";
  const tenant = decodeURIComponent(params.tenant);

  const res = await fetch(`${dashboardBase}/api/public/menu/${encodeURIComponent(tenant)}`, {
    cache: "no-store",
  });

  if (res.status === 404) notFound();
  if (!res.ok) throw new Error("Error cargando menu publico");

  const data = (await res.json()) as PublicMenuResponse;
  const products = data.products ?? [];

  // Esta app no tiene aun endpoint publico de destacados por tenant.
  const highlights: Highlight[] = [];

  // Las categorias se derivan desde los productos recibidos.
  const categories: Category[] = Array.from(
    new Map(
      products
        .map((p) => p.category)
        .filter((c): c is Category => Boolean(c?.id))
        .map((c) => [c.id, c])
    ).values()
  );

  return <ClientMenu products={products} categories={categories} highlights={highlights} />;
}
