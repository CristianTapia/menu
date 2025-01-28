import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="logo"
          width={180}
          height={38}
          priority
        />
        <p className="list-inside list-decimal text-sm text-center sm:text-left">
          ¡Bienvenido/a! 😊
        </p>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/menu"
            target="_blank"
            rel="noopener noreferrer"
          >
            Acceder a la carta
          </Link>
          <Link
            className="rounded-full border border-solid transition-colors flex items-center justify-center text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/formulario"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sugerencias/reclamos
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-1 flex-wrap items-center justify-center">
        <span>&copy; 2025. Desarrollado por</span>
        <a
          className="flex items-center underline underline-offset-4"
          href="https://eiper.cl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Nombre de la empresa
        </a>
      </footer>
    </div>
  );
}
