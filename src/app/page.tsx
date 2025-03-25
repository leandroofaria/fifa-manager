import { Container } from "@/components/container";
import { AnimatedTestimonials } from "@/utils/aceternity";
import Image from "next/image";

const data = [
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

export default function Home() {
  return (
    <main>
       <Container>
          <div className="mt-3">
            <AnimatedTestimonials testimonials={data} autoplay />
          </div>

          {/* Ultimas Noticias */}
          <div>
            <h1>Últimas Notícias</h1>

            
          </div>
        </Container>
    </main>
  );
}
