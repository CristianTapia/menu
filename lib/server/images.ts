import "server-only";

type SignedMap = Map<string, string | null>;

export async function getSignedMap(base: string, paths: string[], ttl = 3600): Promise<SignedMap> {
  if (!paths?.length) return new Map();
  const unique = Array.from(new Set(paths)).filter(Boolean);

  // pequeño helper con retry
  const fetchSigned = async (p: string, tries = 2): Promise<[string, string | null]> => {
    const url = `${base}/api/signed?path=${encodeURIComponent(p)}&expires=${ttl}`;
    try {
      const r = await fetch(url, { method: "GET", cache: "no-store" });
      if (!r.ok) return [p, null];
      const j = await r.json();
      return [p, j.url ?? null];
    } catch (e) {
      if (tries > 0) return fetchSigned(p, tries - 1);
      return [p, null];
    }
  };

  const pairs = await Promise.all(unique.map((p) => fetchSigned(p)));
  return new Map(pairs);
}
