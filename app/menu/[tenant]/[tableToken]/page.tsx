import { notFound } from "next/navigation";

import ClientMenu from "@/app/ui/ClientMenu";
import { loadPublicMenuByTenant } from "@/lib/server/publicMenu";
import { loadPublicTableByToken, trackPublicTableView } from "@/lib/server/publicTableAccess";

export const dynamic = "force-dynamic";

export default async function TenantTableMenuPage({
  params,
}: {
  params: Promise<{ tenant: string; tableToken: string }>;
}) {
  const { tenant, tableToken } = await params;
  const requestedTenant = decodeURIComponent(tenant);
  const table = await loadPublicTableByToken(tableToken);

  const matchesTenant =
    requestedTenant === table.tenant.id ||
    (table.tenant.domain !== null && requestedTenant.toLowerCase() === table.tenant.domain.toLowerCase());

  if (!matchesTenant) {
    notFound();
  }

  const data = await loadPublicMenuByTenant(requestedTenant);

  try {
    await trackPublicTableView(table.token, "tenant_table");
  } catch (error) {
    console.error(error);
  }

  return (
    <ClientMenu
      products={data.products}
      categories={data.categories}
      highlights={data.highlights}
      context={{
        tenantId: table.tenant.id,
        tenantName: table.tenant.name,
        location: data.location,
        tableLabel: table.label,
        tableToken: table.token,
      }}
    />
  );
}
