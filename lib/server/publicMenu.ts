import { notFound } from "next/navigation";

import { Category, Highlight, Product } from "@/lib/types";

export type PublicTenant = {
  id: string;
  name: string;
  domain: string | null;
};

type PublicMenuResponse = {
  tenant: PublicTenant;
  products: Product[];
};

export type PublicMenuData = {
  tenant: PublicTenant;
  products: Product[];
  categories: Category[];
  highlights: Highlight[];
};

export async function loadPublicMenuByTenant(tenantKey: string): Promise<PublicMenuData> {
  const dashboardBase = process.env.NEXT_PUBLIC_DASHBOARD_API_URL ?? "http://localhost:3001";
  const tenant = decodeURIComponent(tenantKey);

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
        .map((product) => product.category)
        .filter((category): category is Category => Boolean(category?.id))
        .map((category) => [category.id, category])
    ).values()
  );

  return {
    tenant: data.tenant,
    products,
    categories: categoriesFromApi.length > 0 ? categoriesFromApi : categoriesFromProducts,
    highlights,
  };
}
