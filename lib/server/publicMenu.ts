import { notFound } from "next/navigation";

import { Category, Highlight, Product, TenantLocation } from "@/lib/types";
import { fetchDashboardApi } from "./dashboardApi";

export type PublicTenant = {
  id: string;
  name: string;
  domain: string | null;
  address?: string | null;
  location_address?: string | null;
  latitude?: number | string | null;
  longitude?: number | string | null;
  lat?: number | string | null;
  lng?: number | string | null;
  maps_url?: string | null;
  mapsUrl?: string | null;
};

type PublicMenuResponse = {
  tenant: PublicTenant;
  products: Product[];
};

export type PublicMenuData = {
  tenant: PublicTenant;
  location: TenantLocation | null;
  products: Product[];
  categories: Category[];
  highlights: Highlight[];
};

function toNumber(value: number | string | null | undefined) {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value !== "string") return null;

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function getTenantLocation(tenant: PublicTenant): TenantLocation | null {
  const address = tenant.address ?? tenant.location_address ?? null;
  const lat = toNumber(tenant.lat ?? tenant.latitude);
  const lng = toNumber(tenant.lng ?? tenant.longitude);
  const mapsUrl = tenant.mapsUrl ?? tenant.maps_url ?? null;

  if (!address && !mapsUrl && (lat === null || lng === null)) return null;

  return {
    name: tenant.name,
    address,
    lat,
    lng,
    mapsUrl,
  };
}

export async function loadPublicMenuByTenant(tenantKey: string): Promise<PublicMenuData> {
  const tenant = decodeURIComponent(tenantKey);

  const [menuRes, categoriesRes, highlightsRes] = await Promise.all([
    fetchDashboardApi(`/api/public/menu/${encodeURIComponent(tenant)}`, { cache: "no-store" }),
    fetchDashboardApi(`/api/categories?tenant=${encodeURIComponent(tenant)}`, { cache: "no-store" }),
    fetchDashboardApi(`/api/highlights?tenant=${encodeURIComponent(tenant)}&limit=20`, { cache: "no-store" }),
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
    location: getTenantLocation(data.tenant),
    products,
    categories: categoriesFromApi.length > 0 ? categoriesFromApi : categoriesFromProducts,
    highlights,
  };
}
