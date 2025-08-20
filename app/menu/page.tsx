import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { createSupabaseAdmin } from "@/lib/supabaseAdmin";
import ClientMenu from "../ui/ClientMenu";

export default async function Page() {
  // 1) leer datos con anon (SSR)
  const supabase = await createSupabaseServerClient();

  const { data: products = [], error: prodError } = await supabase
    .from("products")
    .select("id, name, price, stock, description, category:categories(id, name), image_path")
    .order("created_at", { ascending: false });

  const { data: categories = [], error: catError } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: false });

  if (prodError || catError) {
    console.error("Error en Supabase:", prodError ?? catError);
    return <div>Error cargando datos</div>;
  }

  // 2) firmar imágenes con service_role (solo server)
  const admin = createSupabaseAdmin();

  const paths = (products ?? []).map((p: any) => p.image_path).filter((p: string | null): p is string => !!p);

  let mapPathToUrl = new Map<string, string>();
  if (paths.length) {
    const { data: signed, error } = await admin.storage.from("product-images").createSignedUrls(paths, 60 * 60); // 1 hora

    if (error) {
      console.error("Error firmando imágenes:", error);
    } else {
      signed.forEach((s, i) => {
        if (s.signedUrl) mapPathToUrl.set(paths[i], s.signedUrl);
      });
    }
  }

  // 3) normalizar relación y añadir image_url
  const mappedProducts = (products ?? []).map((product: any) => ({
    ...product,
    category: Array.isArray(product.category) ? product.category[0] ?? null : product.category,
    image_url: product.image_path ? mapPathToUrl.get(product.image_path) ?? null : null,
  }));

  return <ClientMenu products={mappedProducts} categories={categories ?? []} />;
}
