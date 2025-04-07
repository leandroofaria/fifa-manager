import { Container } from "@/components/container";
import { NoticiasCarousel } from "@/components/carrosel de noticias/noticias-carousel";
import { FormDialog } from "@/components/formulario de noticias/postar-noticia";

async function getNoticias() {
  const res = await fetch("http://localhost:3000/api/noticias", {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Erro ao buscar notícias:", res.status);
    return [];
  }

  const json = await res.json();
  return Array.isArray(json) ? json : [];
}

export default async function Home() {
  const noticias = await getNoticias();

  return (
    <main>
      <Container>
        <div className="mt-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Últimas Notícias</h2>
            <FormDialog />
          </div>

          <NoticiasCarousel noticias={noticias} />
        </div>
      </Container>
    </main>
  );
}
