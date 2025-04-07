"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  JSX,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Image, { ImageProps } from "next/image";
import { useOutsideClick } from "../hooks/use-outside-click";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      const cardWidth = 256;
      const gap = 16;
      carouselRef.current.scrollBy({
        left: -2 * (cardWidth + gap),
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const cardWidth = 256;
      const gap = 16;
      carouselRef.current.scrollBy({
        left: 2 * (cardWidth + gap),
        behavior: "smooth",
      });
    }
  };

  const handleCardClose = (index: number) => {
    const cardWidth = 256;
    const gap = 16;
    const scrollPosition = (cardWidth + gap) * index;
    carouselRef.current?.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
    setCurrentIndex(index);
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll pt-10 pb-4 scroll-smooth [scrollbar-width:none] no-scrollbar"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className="flex flex-row justify-start gap-4 pl-4 max-w-7xl mx-auto">
            {items.map((item, index) => (
              <motion.div
                key={"card" + index}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.1 * index,
                    ease: "easeOut",
                  },
                }}
                exit={{ opacity: 0 }}
                className="rounded-2xl last:pr-[5%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Setas fixas abaixo do carrossel */}
        <div className="w-full flex justify-center items-center gap-3 mt-4">
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className="h-10 w-10 rounded-full bg-[#3e644e] flex items-center justify-center disabled:opacity-50 transition"
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className="h-10 w-10 rounded-full bg-[#3e644e] flex items-center justify-center disabled:opacity-50 transition"
          >
            <IconArrowNarrowRight className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose } = useContext(CarouselContext);

  useOutsideClick(containerRef, () => handleClose());

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      onCardClose(index);
    }, 100); // tempo pra garantir scroll após a transição
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/80 backdrop-blur-lg fixed inset-0"
            />
            <motion.div
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-5xl mx-auto bg-white dark:bg-neutral-900 z-[60] my-10 p-4 md:p-10 rounded-3xl font-sans relative"
            >
              <button
                onClick={handleClose}
                className="sticky top-4 h-8 w-8 right-0 ml-auto bg-black dark:bg-white rounded-full flex items-center justify-center"
              >
                <IconX className="h-6 w-6 text-white dark:text-black" />
              </button>
              <motion.p className="text-base font-medium text-black dark:text-white">
                {card.category}
              </motion.p>
              <motion.h2 className="text-2xl md:text-4xl font-semibold mt-4 text-neutral-700 dark:text-white">
                {card.title}
              </motion.h2>
              <div className="py-10">{card.content}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="rounded-2xl bg-gray-100 dark:bg-neutral-900 h-64 w-44 md:h-80 md:w-64 overflow-hidden flex flex-col relative z-10"
      >
        <BlurImage
          src={card.src}
          alt={card.title}
          fill
          className="object-cover absolute z-0 inset-0"
        />
        <div className="relative z-10 mt-auto w-full bg-black/30 text-white p-4">
          <p className="text-xs">{card.category}</p>
          <p className="text-sm md:text-base font-semibold">{card.title}</p>
        </div>
      </motion.button>
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn(
        "transition-all duration-500 ease-in-out rounded-2xl",
        isLoading ? "blur-md scale-105" : "blur-0 scale-100",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      quality={85}
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ?? "Imagem"}
      {...rest}
    />
  );
};
