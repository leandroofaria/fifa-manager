"use client"

import { Carousel, Card } from "@/utils/aceternity/apple-cards-carousel"

export type Noticia = {
  titulo: string
  conteudo: string
  data: string
  foto: string
}

interface Props {
  noticias: Noticia[]
}

export function NoticiasCarousel({ noticias }: Props) {
  const noticiasOrdenadas = [...noticias].sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
  )

  return (
    <div className="w-full mt-4">
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
  )
}
