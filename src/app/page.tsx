import { Container } from "@/components/container";
import { AnimatedTestimonials } from "@/utils/aceternity";
import { noticias } from "../../data/25-26/noticias";
import { NoticiasCarousel } from "@/components/carrosel de noticias/noticias-carousel";
import { NoticiasAnimated } from "@/components/noticias iniciais/noticias-animated";

export default function Home() {
  const testimonials = [
    {
      quote: "O jogo mudou totalmente nossa visão sobre desenvolvimento.",
      name: "Leandro",
      designation: "Dev do FIFA Manager",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote: "Nunca foi tão fácil ver minhas estatísticas de modo carreira.",
      name: "Vinícius",
      designation: "Atacante titular",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <main>
      <Container>
        <div className="mt-3">
          <NoticiasAnimated noticias={noticias} autoplay />
        </div>

        {/* Últimas Notícias */}
        <div className="mt-10">
          <NoticiasCarousel noticias={noticias} />
        </div>
      </Container>
    </main>
  );
}
