import Link from "next/link";

export function Header() {
  return (
    <header className="w-full h-20 bg-mediumgreen px-2 text-white">
      <div className="max-w-screen-xl mx-auto h-full flex items-center justify-between font-black">
        {/* Logo à esquerda */}
        <div>
          <Link href="/" className="text-xl font-bold">P</Link>
        </div>

        {/* Links à direita */}
        <nav className="flex gap-6 font-semibold text-base">
          <Link
            href="/temporadas"
            className="hover:scale-115 transition-all duration-300"
          >
            Competições
          </Link>
          <Link
            href="/elenco"
            className="hover:scale-115 transition-all duration-300"
          >
            Elenco
          </Link>
          <Link
            href="/titulos"
            className="hover:scale-115 transition-all duration-300"
          >
            Títulos
          </Link>
        </nav>
      </div>
    </header>
  );
}
