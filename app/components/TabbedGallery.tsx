"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

type SectionItem = {
  id: number;
  title: string;
  images: { id: number; src: string }[];
};

export function TabbedGallery({ items }: { items: SectionItem[] }) {
  // Find "Events" tab, or default to the last one
  const defaultTab = items.find(item => item.title === 'Events')?.title || items[0].title;
  const [activeTab, setActiveTab] = useState(defaultTab);

  const activeContent = items.find((item) => item.title === activeTab);

  return (
    <section className="w-full bg-white text-black py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start pb-12 gap-8 md:gap-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight md:w-[60%]">
            What we have been upto
          </h2>
          <p className="text-base md:text-lg text-gray-500 font-normal md:w-[40%] mt-2 md:mt-0">
            This is an overview of all the events that we have been conducting to stay true to our mission and vision
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center flex-wrap gap-4 mb-16">
          {items.map((item) => {
            const isActive = activeTab === item.title;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.title)}
                className={`px-6 py-2 rounded-lg font-normal transition-all duration-300 text-sm md:text-base ${
                  isActive
                    ? "bg-white text-black border border-gray-300 shadow-sm"
                    : "bg-[#2A2A2A] text-gray-300 hover:bg-[#333333] border border-transparent"
                }`}
              >
                {item.title}
              </button>
            );
          })}
        </div>

        {/* Gallery Marquee */}
        <div className="overflow-hidden w-full relative pb-4">
          <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
            <AnimatePresence mode="popLayout">
              {[
                ...(activeContent?.images || []),
                ...(activeContent?.images || []),
                ...(activeContent?.images || []),
                ...(activeContent?.images || [])
              ].map((image, index) => (
                <motion.div
                  key={`${activeContent?.id}-${image.id}-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="relative aspect-[3/4] w-[280px] md:w-[320px] lg:w-[350px] flex-shrink-0 rounded-md md:rounded-xl overflow-hidden bg-gray-100"
                >
                  <Image
                    src={image.src.trim()}
                    alt={`${activeContent?.title} ${image.id}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
