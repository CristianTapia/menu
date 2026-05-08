const DEFAULT_DASHBOARD_API_URL = "http://localhost:3001";

export function getDashboardApiBase() {
  const value = process.env.DASHBOARD_API_URL ?? process.env.NEXT_PUBLIC_DASHBOARD_API_URL ?? DEFAULT_DASHBOARD_API_URL;
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;

  return withProtocol.replace(/\/+$/, "");
}

export async function fetchDashboardApi(path: string, init?: RequestInit) {
  const base = getDashboardApiBase();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${base}${normalizedPath}`;

  try {
    return await fetch(url, init);
  } catch (error) {
    throw new Error(
      `No se pudo conectar con la API del dashboard en ${base}. Revisa DASHBOARD_API_URL o NEXT_PUBLIC_DASHBOARD_API_URL.`,
      { cause: error }
    );
  }
}
