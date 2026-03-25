import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen grid place-items-center p-6">
      <div className="max-w-lg w-full rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-sm">
        <h1 className="text-xl font-semibold mb-2">Menu publico</h1>
        <p className="text-sm mb-4">Abre la ruta del tenant para ver su carta digital.</p>
        <p className="text-sm mb-6">
          Ejemplo: <code>/menu/local-demo</code>
        </p>
        <Link href="/menu" className="inline-block text-sm font-medium text-blue-700 underline underline-offset-2">
          Ir a ayuda de acceso
        </Link>
      </div>
    </main>
  );
}
