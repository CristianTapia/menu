// app/menu/page.tsx
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import ClientMenu from "../ui/ClientMenu";

export default async function Page() {
  const supabase = await createSupabaseServerClient();

  const { data: products = [], error: prodError } = await supabase
    .from("products")
    .select("id, name, price, stock, category:categories(id, name)")
    .order("created_at", { ascending: false });

  const { data: categories = [], error: catError } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: false });

  if (prodError || catError) {
    console.error("Error en Supabase:", prodError ?? catError);
    return <div>Error cargando datos</div>;
  }

  const mappedProducts = (products ?? []).map((product: any) => ({
    ...product,
    category: Array.isArray(product.category) ? product.category[0] ?? null : product.category,
  }));

  return <ClientMenu products={mappedProducts} categories={categories ?? []} />;
}
