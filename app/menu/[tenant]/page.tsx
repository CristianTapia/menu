import ClientMenu from "@/app/ui/ClientMenu";
import { Category, Highlight, Product } from "@/lib/types";
import { notFound } from "next/navigation";

type PublicMenuResponse = {
  tenant: { id: string; name: string; domain: string | null };
  products: Product[];
};

export const dynamic = "force-dynamic";

export default async function TenantMenuPage({ params }: { params: Promise<{ tenant: string }> }) {
  const dashboardBase = process.env.NEXT_PUBLIC_DASHBOARD_API_URL ?? "http://localhost:3001";
  const { tenant: tenantParam } = await params;
  const tenant = decodeURIComponent(tenantParam);

  const [menuRes, categoriesRes, highlightsRes] = await Promise.all([
    fetch(`${dashboardBase}/api/public/menu/${encodeURIComponent(tenant)}`, { cache: "no-store" }),
    fetch(`${dashboardBase}/api/categories?tenant=${encodeURIComponent(tenant)}`, { cache: "no-store" }),
    fetch(`${dashboardBase}/api/highlights?tenant=${encodeURIComponent(tenant)}&limit=20`, { cache: "no-store" }),
  ]);

  if (menuRes.status === 404) notFound();
  if (!menuRes.ok) throw new Error("Error cargando menu publico");

  const data = (await menuRes.json()) as PublicMenuResponse;
  const products = data.products ?? [];

  const highlights: Highlight[] = highlightsRes.ok ? (((await highlightsRes.json()) as Highlight[]) ?? []) : [];

  const categoriesFromApi: Category[] = categoriesRes.ok ? (((await categoriesRes.json()) as Category[]) ?? []) : [];
  const categoriesFromProducts: Category[] = Array.from(
    new Map(
      products
        .map((p) => p.category)
        .filter((c): c is Category => Boolean(c?.id))
        .map((c) => [c.id, c])
    ).values()
  );
  const categories = categoriesFromApi.length > 0 ? categoriesFromApi : categoriesFromProducts;

  return <ClientMenu products={products} categories={categories} highlights={highlights} />;
}
