import ClientMenu from "@/app/ui/ClientMenu";
import { loadPublicMenuByTenant } from "@/lib/server/publicMenu";

export const dynamic = "force-dynamic";

export default async function TenantMenuPage({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant: tenantParam } = await params;
  const data = await loadPublicMenuByTenant(tenantParam);

  return (
    <ClientMenu
      products={data.products}
      categories={data.categories}
      highlights={data.highlights}
      context={{ tenantName: data.tenant.name }}
    />
  );
}
