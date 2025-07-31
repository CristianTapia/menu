import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function GET() {
  console.log("🔍 Llamaron a /api/categories");

  const { data, error } = await supabase.from("categories").select("*").order("name", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log("→ data:", data);
  return NextResponse.json(data);
}
