import { notFound } from "next/navigation";

import { fetchDashboardApi } from "./dashboardApi";
import type { PublicTenant } from "./publicMenu";

export type PublicTableContext = {
  id: string;
  tenantId: string;
  token: string;
  label: string;
  tenant: PublicTenant;
};

type PublicTableApiResponse = {
  table: {
    id: string;
    tenant_id: string;
    public_token: string;
    label: string;
  };
  tenant: PublicTenant;
};

export async function loadPublicTableByToken(tableToken: string): Promise<PublicTableContext> {
  const normalizedToken = decodeURIComponent(tableToken).trim();
  const response = await fetchDashboardApi(`/api/public/tables/${encodeURIComponent(normalizedToken)}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    let detail = "";
    try {
      const payload = (await response.json()) as { error?: string };
      detail = payload.error ? `: ${payload.error}` : "";
    } catch {
      detail = "";
    }

    throw new Error(`Error cargando mesa publica (${response.status})${detail}`);
  }

  const data = (await response.json()) as PublicTableApiResponse;

  return {
    id: data.table.id,
    tenantId: data.table.tenant_id,
    token: data.table.public_token,
    label: data.table.label,
    tenant: data.tenant,
  };
}

export async function trackPublicTableView(tableToken: string, route: "short" | "tenant_table") {
  const normalizedToken = decodeURIComponent(tableToken).trim();

  const response = await fetchDashboardApi(`/api/public/tables/${encodeURIComponent(normalizedToken)}/events`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      event_type: "menu_view",
      source: "public_menu",
      route,
    }),
  });

  if (!response.ok) {
    throw new Error("Error registrando visita de mesa");
  }
}
