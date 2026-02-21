import Link from "next/link";

export default function MenuLandingPage() {
  return (
    <main className="min-h-screen grid place-items-center p-6">
      <div className="max-w-lg w-full rounded-xl border border-slate-200 bg-white p-6 text-slate-900">
        <h1 className="text-xl font-semibold mb-2">Menu publico</h1>
        <p className="text-sm mb-4">
          Debes abrir esta ruta con tenant, por ejemplo: <code>/menu/local-2</code>.
        </p>
        <p className="text-sm mb-4">
          Si vienes desde QR, revisa que el codigo apunte a <code>/menu/&lt;tenant-domain&gt;</code>.
        </p>
        <Link href="/" className="inline-block text-sm font-medium text-blue-700 underline underline-offset-2">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
