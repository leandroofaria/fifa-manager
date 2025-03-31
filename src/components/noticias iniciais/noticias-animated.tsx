"use client"

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"
import { motion, AnimatePresence } from "motion/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import type { Noticia } from "@/components/carrosel de noticias/noticias-carousel"

export const NoticiasAnimated = ({
  noticias,
  autoplay = false,
}: {
  noticias: Noticia[]
  autoplay?: boolean
}) => {
  const noticiasOrdenadas = [...(noticias ?? [])]
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 3)

  const [active, setActive] = useState(0)
  const [rotations, setRotations] = useState<number[]>([])
  const [isVerticals, setIsVerticals] = useState<boolean[]>([])

  useEffect(() => {
    const generatedRotations = noticiasOrdenadas.map(() => Math.floor(Math.random() * 21) - 10)
    setRotations(generatedRotations)
    setIsVerticals(new Array(noticiasOrdenadas.length).fill(false))
  }, [noticias])

  const handleImageLoad = (
    e: React.SyntheticEvent<HTMLImageElement>,
    index: number
  ) => {
    const img = e.currentTarget
    const isVertical = img.naturalHeight > img.naturalWidth
    setIsVerticals((prev) => {
      const updated = [...prev]
      updated[index] = isVertical
      return updated
    })
  }

  const handleNext = () => {
    setActive((prev) => (prev + 1) % noticiasOrdenadas.length)
  }

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + noticiasOrdenadas.length) % noticiasOrdenadas.length)
  }

  const isActive = (index: number) => index === active

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000)
      return () => clearInterval(interval)
    }
  }, [autoplay])

  if (!noticiasOrdenadas.length) {
    return (
      <div className="p-10 text-center text-gray-500">
        Nenhuma notícia disponível no momento.
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 font-sans antialiased">
      <div className="relative grid grid-cols-1 gap-12 md:grid-cols-2 items-start">
        {/* Imagem */}
        <div
          className={`relative w-full h-[500px] overflow-hidden rounded-3xl ${
            isVerticals[active] ? "aspect-[3/4]" : "aspect-[16/9]"
          }`}
        >
          <AnimatePresence>
            {noticiasOrdenadas.map((noticia, index) => (
              <motion.div
                key={noticia.foto + index}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  z: -100,
                  rotate: rotations[index] || 0,
                }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.7,
                  scale: isActive(index) ? 1 : 0.95,
                  z: isActive(index) ? 0 : -100,
                  rotate: isActive(index) ? 0 : rotations[index] || 0,
                  zIndex: isActive(index) ? 40 : noticiasOrdenadas.length + 2 - index,
                  y: isActive(index) ? [0, -80, 0] : 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  z: 100,
                  rotate: rotations[index] || 0,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 origin-bottom"
              >
                <Image
                  src={noticia.foto}
                  alt={noticia.titulo}
                  fill
                  draggable={false}
                  onLoad={(e) => handleImageLoad(e, index)}
                  className="object-cover object-center transition-all duration-300 rounded-3xl"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Texto e botões */}
        <div className="flex flex-col justify-between">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <p className="text-sm text-gray-500">{noticiasOrdenadas[active].data}</p>
            <h3 className="text-2xl font-semibold text-black dark:text-white mb-2">
              {noticiasOrdenadas[active].titulo}
            </h3>
            <motion.p className="text-base text-gray-800 dark:text-neutral-300 leading-relaxed">
              {noticiasOrdenadas[active].conteudo.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handlePrev}
              className="group/button flex h-8 w-8 items-center justify-center rounded-full bg-mediumgreen"
            >
              <IconArrowLeft className="h-5 w-5 text-white transition-transform duration-300 group-hover/button:rotate-12" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-8 w-8 items-center justify-center rounded-full bg-mediumgreen"
            >
              <IconArrowRight className="h-5 w-5 text-white transition-transform duration-300 group-hover/button:-rotate-12" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
