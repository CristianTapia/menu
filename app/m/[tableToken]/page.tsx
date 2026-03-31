import ClientMenu from "@/app/ui/ClientMenu";
import { loadPublicMenuByTenant } from "@/lib/server/publicMenu";
import { loadPublicTableByToken, trackPublicTableView } from "@/lib/server/publicTableAccess";

export const dynamic = "force-dynamic";

export default async function PublicTableMenuPage({ params }: { params: Promise<{ tableToken: string }> }) {
  const { tableToken } = await params;
  const table = await loadPublicTableByToken(tableToken);

  const tenantKey = table.tenant.domain ?? table.tenant.id;
  const data = await loadPublicMenuByTenant(tenantKey);

  try {
    await trackPublicTableView(table.token, "short");
  } catch (error) {
    console.error(error);
  }

  return (
    <ClientMenu
      products={data.products}
      categories={data.categories}
      highlights={data.highlights}
      context={{
        tenantName: table.tenant.name,
        tableLabel: table.label,
        tableToken: table.token,
      }}
    />
  );
}
