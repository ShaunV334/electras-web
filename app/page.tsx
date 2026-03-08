"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { RaspberryPiModel } from "./components/RaspberryPiModel";
import { CardStack } from "./components/CardStack";
import dynamic from "next/dynamic";

const MagazineFlipbook = dynamic(() => import("./components/MagazineFlipbook"), {
  ssr: false,
});

// Dummy data for CardStacks
const stackSections = [
  {
    id: 1,
    title: 'Achievements',
    images: [
      { id: 1, src: "/achivements/1.jpg" },
      { id: 2, src: "/achivements/2.jpg" },
    ]
  },
  {
    id: 2,
    title: 'Projects',
    images: [
      { id: 1, src: "/projects/1.jpg" },
      { id: 2, src: "/projects/2.jpg" },
      { id: 3, src: "/projects/3.jpg" },
      { id: 4, src: "/projects/4.jpg" },

    ]
  },
  {
    id: 3,
    title: 'Events',
    images: [
      { id: 1, src: "/events/1.jpg" },
      { id: 2, src: "/events/2.jpg" },
      { id: 3, src: "/events/3.jpg" },
      { id: 4, src: "/events/4.jpg" },
      { id: 5, src: "/events/5.jpg" },
      { id: 6, src: "/events/6.jpg" },
      { id: 7, src: "/events/7.jpg" },
      { id: 8, src: "/events/8.jpg" },
      { id: 9, src: "/events/9.jpg" },
      { id: 10, src: "/events/10.jpg" },
      { id: 11, src: "/events/11.jpg" },
      { id: 12, src: "/events/12.jpg" },
      { id: 13, src: "/events/13.jpg" },
      { id: 14, src: "/events/14.jpg" },
      { id: 15, src: "/events/15.jpg " },
    ]
  },
];

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMagazineOpen, setIsMagazineOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 50]);

  useEffect(() => {
    // Small delay to ensure the browser has painted
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white w-full overflow-clip">
      {/* Intro Overlay Animation */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        initial={{ y: 0 }}
        animate={{ y: isLoaded ? "-100%" : 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 1.5 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-32 h-32 md:w-40 md:h-40"
        >
          {/* Background Faint Logo */}
          <Image
            src="/logo.svg"
            alt="Electras Logo"
            fill
            className="object-contain opacity-20"
            priority
          />

          {/* Foreground White Logo (Fills from bottom to top) */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: isLoaded ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          >
            <Image
              src="/logo.svg"
              alt="Electras Logo Filled"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Main Content (staggered reveal) */}
      <motion.div
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delayChildren: 2.2,
              staggerChildren: 0.2,
            },
          },
        }}
        className="flex flex-col w-full"
      >
        <section className="h-screen flex flex-col w-full overflow-hidden">
          {/* Navigation */}
          <motion.nav
            variants={{
              hidden: { y: -20, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="flex justify-between items-start w-full px-6 py-1 md:px-12 md:py-1 z-10 border-b border-white/10"
          >
            <div className="text-xl font-medium tracking-tight">
              <img src="logo.png" alt="Electras" className="w-10 h-10 mt-5" />
            </div>

            <div className="hidden md:flex flex-col py-4 text-sm text-gray-400 gap-1 text-right">
              <span className="text-white font-medium">Department of Electronics and Computer Engineering</span>
              <span>SJCET, Palai</span>
            </div>
          </motion.nav>

          {/* Hero Section */}
          <div className="flex-grow min-h-0 flex flex-col md:flex-row relative z-10 border-b border-white/10">
            {/* Left Column (Text) */}
            <motion.div
              variants={{
                hidden: { x: -50, opacity: 0 },
                visible: { x: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
              }}
              style={{ y: yText }}
              className="flex-1 flex flex-col justify-center px-6 md:px-12 py-10 md:py-0"
            >
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-medium leading-[1.1] tracking-tight">
                Bridging the Gap
                <br />
                Between Software and
                <br />
                Hardware
                <br />
                Systems
              </h1>
            </motion.div>

            {/* Right Column (Image) - Adjusting layout to match the right-aligned image structure */}
            <div className="flex-1 relative border-l border-white/10 flex items-center justify-center p-4 md:p-12 overflow-visible">
              <motion.div
                variants={{
                  hidden: { scale: 0.9, opacity: 0 },
                  visible: { scale: 1, opacity: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
                }}
                style={{ y: yImage }}
                className="relative w-full h-full min-h-[250px] z-20 flex items-center justify-center overflow-visible"
              >
                <RaspberryPiModel />
              </motion.div>
            </div>
          </div>

          {/* Large Typography Footer Area */}
          <motion.div
            variants={{
              hidden: { y: 50, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="w-full flex justify-center items-end px-4 pb-0 overflow-hidden relative"
          >
            {/* Akihiko-style edge-to-edge typography 
            <Image src="/logo.png" alt="Electras Logo" width={800} height={800} className="h-[35vw] w-auto object-contain shrink-0 -mr-[3vw] -mb-[4vw]" /> */}
            <h2 className="text-[26vw] leading-[0.80] font-bold tracking-tighter text-white whitespace-nowrap flex items-start m-0 p-0">
              Electras
            </h2>
          </motion.div>
        </section>

        {/* Welcome Section */}
        <div className="min-h-screen bg-black text-white px-4 md:p-8 pt-24 border-t border-white/10 flex flex-col items-center">
          <div className="max-w-4xl mx-auto text-center pt-12 md:pt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 px-0 md:px-4 text-left">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                className="p-6 md:p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm"
              >
                <h3 className="text-xl sm:text-2xl md:text-4xl font-medium mb-4 tracking-tight">Vision</h3>
                <p className="text-sm sm:text-base md:text-xl text-gray-400 leading-relaxed">
                  Develop into a centre of excellence in Electronics and Computer Engineering by producing technically competent professionals catering to the needs for Industry, Academia and Society.
                </p>
              </motion.div>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="p-6 md:p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm"
              >
                <h3 className="text-xl sm:text-2xl md:text-4xl font-medium mb-4 tracking-tight">Mission</h3>
                <p className="text-sm sm:text-base md:text-xl text-gray-400 leading-relaxed">
                  To pursue continuous improvement in learning, creativity and innovation among both faculty and students by enhanced infrastructure, state-of-the art laboratories and a unique learning environment. To inculcate in both faculty and students technical and entrepreneurial skills by professional activities to create socially relevant and sustainable solutions in the electronics and computer domain.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* About Sections */}
        <div className="flex flex-col gap-12 md:gap-32 max-w-6xl mx-auto py-16 md:py-32 px-6 sm:px-8 md:px-12 border-t border-white/10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-medium mb-6 tracking-tight">
              About ELECTRAS
            </h2>
            <p className="text-base sm:text-lg md:text-2xl text-gray-400 leading-relaxed max-w-5xl">
              ELECTRAS is a dynamic student organization driving innovation and leadership in Electronics and Computer Science Engineering. Our vision is to build a powerhouse community of engineers who challenge limits, redefine technology, and shape a smarter, more connected future. At ELECTRAS, creativity meets expertise. We empower students to transform ideas into reality through hands-on projects, transformative workshops, impactful research, and collaborations with industry leaders. By bridging theory and practice, we prepare our members to become innovators who lead change and create lasting impact. Rooted in collaboration, curiosity, and excellence, ELECTRAS nurtures a new generation of problem-solvers ready to tackle global challenges with sustainable, socially responsible, and forward-thinking solutions. ELECTRAS — where ambition, innovation, and engineering excellence converge to define tomorrow.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-medium mb-6 tracking-tight">
              About Electronics and Computer Engineering
            </h2>
            <p className="text-base sm:text-lg md:text-2xl text-gray-400 leading-relaxed max-w-5xl">
              Electronics and Computer Engineering is an integrated discipline that bridges the worlds of hardware and software, preparing students to meet the evolving demands of modern technology industries. By merging these two dynamic fields, the program offers a strong foundation in both electronics and computing, enabling students to develop versatile skills and a deep understanding of cutting-edge technologies. This cross-disciplinary approach empowers aspiring engineers to pursue diverse career paths across sectors—ranging from core electronics to software development and emerging tech innovations. The result is a new generation of multi-skilled, forward-thinking professionals equipped to design intelligent systems, drive innovation, and shape the future of technology with creativity and precision.
            </p>
          </motion.div>
        </div>

        {/* Vertical Sticky Card Stacks */}
        <div className="w-full bg-black pt-16">
          <CardStack items={stackSections} />
        </div>

        {/* Magazine Flipbook Integration */}
        <section className="w-full flex justify-center items-center py-12 md:py-24 border-t border-white/10 relative z-20">
          <div className="w-full text-center flex flex-col items-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-12 tracking-tight">
              Our Publications
            </h2>

            {/* Bookshelf Layout */}
            <div className="w-full max-w-5xl mx-auto flex flex-col items-center mt-12">
              <div className="w-full relative px-4 sm:px-12 flex justify-center md:justify-start pb-3 md:pb-5 items-end min-h-[250px] md:min-h-[350px]">

                {/* Magazine Thumbnail */}
                <div
                  onClick={() => setIsMagazineOpen(true)}
                  className="group relative w-40 h-56 md:w-56 md:h-80 cursor-pointer transform transition-all duration-500 hover:-translate-y-4 z-10 ml-0 md:ml-6"
                  style={{ perspective: "1000px" }}
                >
                  {/* Under-shadow */}
                  <div className="absolute -bottom-3 left-2 right-2 h-4 bg-black/60 blur-md rounded-full transition-all duration-500 group-hover:scale-90 group-hover:opacity-40"></div>

                  {/* Book Cover */}
                  <div className="absolute inset-0 bg-neutral-900 rounded-sm overflow-hidden border border-white/10 shadow-[10px_5px_15px_rgba(0,0,0,0.6)] z-10 transition-transform duration-500 group-hover:rotate-y-[-5deg] flex items-center justify-center">
                    <Image
                      src="/magazine-cover-small-01.jpg"
                      alt="Electras Magazine Cover"
                      fill
                      className="object-contain"
                      priority
                    />

                    {/* Glossy overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm pointer-events-none z-20"></div>
                  </div>

                  {/* Spine edge */}
                  <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-r from-black/40 to-transparent z-20"></div>
                </div>

                {/* The Shelf */}
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-b from-neutral-200 to-neutral-400 rounded-sm shadow-[0_15px_30px_rgba(0,0,0,0.9)] z-0">
                  <div className="absolute inset-0 bg-white/20"></div>
                </div>
                {/* Deep wall shadow */}
                <div className="absolute bottom-[-15px] left-8 right-8 h-8 bg-black/80 blur-xl z-[-1]"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Fullscreen Flipbook Overlay */}
        <AnimatePresence>
          {isMagazineOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center overflow-hidden"
            >
              <button
                onClick={() => setIsMagazineOpen(false)}
                className="absolute top-6 right-6 z-[110] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                aria-label="Close Magazine"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-full h-full pt-16 pb-8 px-4 flex justify-center items-center">
                <div className="w-full max-w-7xl max-h-full flex justify-center items-center overflow-auto scrollbar-hide">
                  <MagazineFlipbook />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="bg-black text-white border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
              <div className="col-span-1 sm:col-span-2 md:col-span-2">
                <h3 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">ELECTRAS</h3>
                <p className="text-gray-400 text-sm md:text-base">
                  made with ❤️ by ER.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4 text-sm md:text-base tracking-wide uppercase text-gray-500">Navigation</h4>
                <ul className="space-y-2 text-gray-400 text-sm md:text-base">
                  <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Work</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4 text-sm md:text-base tracking-wide uppercase text-gray-500">Social</h4>
                <ul className="space-y-2 text-gray-400 text-sm md:text-base">
                  <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Dribbble</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-xs sm:text-sm">©2025 All rights reserved.</p>
              <div className="flex flex-wrap justify-center gap-6 text-gray-500 text-xs sm:text-sm">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}
