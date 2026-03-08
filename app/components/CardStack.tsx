"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Image from "next/image";

// Placeholder images for the effect
const placeholderCards = [
  { 
    id: 1, 
    color: "#fff", 
    title: "Web Design", 
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2600&auto=format&fit=crop",
    author: "Gregory Lalle",
    authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop"
  },
  { 
    id: 2, 
    color: "#fff", 
    title: "Design", 
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2600&auto=format&fit=crop",
    author: "Clive Willow",
    authorImage: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop"
  },
  { 
    id: 3, 
    color: "#fff", 
    title: "Architecture", 
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2600&auto=format&fit=crop",
    author: "Sarah Jenkins",
    authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
  }
];

export interface CardItem {
  id: string | number;
  color?: string;
  title: string;
  images: { id: string | number; src: string }[];
}

export function CardStack({ items = [] }: { items?: CardItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress for the *entire container*
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    // Height = (number of cards) * 100vh. Plus an extra 100vh so it lingers fully stacked.
    <div ref={containerRef} className="relative w-full bg-black" style={{ height: `${(items.length + 1) * 100}vh` }}>
      {/* Sticky wrapper that holds the viewport constraints */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {items.map((card, index) => {
          return (
            <SlidingCard 
              key={card.id} 
              card={card} 
              index={index} 
              progress={scrollYProgress} 
              totalCards={items.length}
            />
          );
        })}
      </div>
    </div>
  );
}

function SlidingCard({ card, index, progress, totalCards }: any) {
  // We want each card to take exactly 1 "step" of the progress.
  // We added an extra 100vh to the container height so there's a lingering step at the end.
  // So total steps = totalCards.
  const step = 1 / totalCards;
  
  // Card 0 doesn't slide, it's just the base.
  // Card 1 slides between step 0 and step 1.
  // Card 2 slides between step 1 and step 2.
  const slideStart = (index - 1) * step;
  const slideEnd = index * step;
  
  // y value goes from 100vh (bottom of screen) to 0vh (fully covering)
  // For the first card (index 0), it stays at 0vh always.
  const yOffset = useTransform(
    progress,
    [Math.max(0, slideStart), slideEnd],
    [index === 0 ? 0 : 100, 0]
  );

  return (
    <motion.div 
      className={`absolute inset-x-0 bottom-0 w-full h-full origin-bottom flex flex-col items-center justify-start border-t border-white/10 rounded-t-[2rem] md:rounded-t-[4rem] shadow-[0_-20px_50px_rgba(0,0,0,0.8)] pt-20 md:pt-32 bg-black`}
      style={{ 
        y: useTransform(yOffset, val => `${val}vh`),
        zIndex: index * 10
      }}
    >
      <div className="w-full flex flex-col gap-8 md:gap-16 max-w-[1700px] mx-auto overflow-hidden flex-grow">
        
        {/* Card Heading */}
        <div className="px-8 md:px-16 w-full">
            <h2 className="text-4xl md:text-6xl font-normal tracking-tight uppercase text-white">
              {card.title}
            </h2>
        </div>

        {/* Horizontal Marquee Inside Card */}
        <div className="relative w-full flex-grow flex items-start overflow-hidden pt-4 pb-12">
          {/* Fading edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

          <motion.div
            className="flex gap-4 md:gap-8 px-4 w-max h-[350px] md:h-[500px]"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 35 + (index * 5), // vary duration slightly per layer
            }}
          >
            {/* Triplicate for smooth endless looping */}
            {[...card.images, ...card.images, ...card.images].map((img: any, idx: number) => (
              <div 
                key={`${img.id}-${idx}`}
                className="relative w-64 h-full md:w-[400px] rounded-3xl md:rounded-[2.5rem] overflow-hidden flex-shrink-0 bg-white/5 border border-white/10"
              >
                <Image
                  src={img.src}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}
