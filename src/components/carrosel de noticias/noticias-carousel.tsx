"use client";
import { Carousel, Card } from "@/utils/aceternity/apple-cards-carousel";

interface Noticia {
  titulo: string;
  conteudo: string;
  data: string;
  foto: string;
}

interface Props {
  noticias: Noticia[];
}

export function NoticiasCarousel({ noticias }: Props) {
  // Ordena do mais recente pro mais antigo
  const noticiasOrdenadas = [...noticias].sort((a, b) => {
    return new Date(b.data).getTime() - new Date(a.data).getTime();
  });

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Últimas notícias
      </h2>

      <Carousel
        items={noticiasOrdenadas.map((noticia, index) => (
          <Card
            key={noticia.titulo + index}
            index={index}
            layout
            card={{
              category: noticia.data,
              title: noticia.titulo,
              src: noticia.foto,
              content: (
                <p className="text-lg text-neutral-800 dark:text-neutral-200 leading-relaxed max-w-2xl">
                  {noticia.conteudo}
                </p>
              ),
            }}
          />
        ))}
      />
    </div>
  );
}
