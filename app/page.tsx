"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { X, Instagram, Linkedin } from "lucide-react";
import { RaspberryPiModel } from "./components/RaspberryPiModel";
import { TabbedGallery } from "./components/TabbedGallery";
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
            <div className="text-xl font-normal tracking-tight">
              <img src="logo.svg" alt="Electras" className="w-10 h-10 mt-5" />
            </div>

            <div className="hidden md:flex flex-col py-4 text-sm text-gray-400 gap-1 text-right">
              <span className="text-white font-normal">Department of Electronics and Computer Engineering</span>
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
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-normal leading-[1.1] tracking-tight">
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
            <h2 className="text-[26vw] leading-[0.80] font-semibold tracking-tighter text-white whitespace-nowrap flex items-start m-0 p-0">
              Electras
            </h2>
          </motion.div>
        </section>

        {/* About Section */}
        <section className="w-full bg-white text-black py-20 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto flex flex-col pt-8">
            <motion.h1 
               initial={{ y: 50, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="text-[14vw] sm:text-[12vw] md:text-[150px] lg:text-[180px] font-semibold leading-none tracking-tighter mb-12 md:mb-20">
              About us
            </motion.h1>

            {/* Electras */}
            <motion.div 
               initial={{ y: 50, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
               className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-12 md:mb-20">
              <div className="md:col-span-4">
                <h2 className="text-3xl md:text-4xl tracking-tight font-normal">Electras</h2>
              </div>
              <div className="md:col-span-8">
                <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-3xl font-normal">
                  <strong className="text-black font-semibold">ELECTRAS is a dynamic student organization</strong> driving innovation and leadership in Electronics and Computer Science Engineering. Our vision is to build a powerhouse community of engineers who challenge limits, redefine technology, and shape a smarter, more connected future. At ELECTRAS, creativity meets expertise. <strong className="text-black font-semibold">We empower students to transform ideas into reality through hands-on projects, transformative workshops, impactful research, and collaborations with industry leaders.</strong> By bridging theory and practice, we prepare our members to become innovators who lead change and create lasting impact. Rooted in collaboration, curiosity, and excellence, ELECTRAS nurtures a new generation of problem-solvers ready to tackle global challenges with sustainable, socially responsible, and forward-thinking solutions. <strong className="text-black font-semibold">ELECTRAS — where ambition, innovation, and engineering excellence converge to define tomorrow.</strong>
                </p>
              </div>
            </motion.div>

            {/* Electronics & Computer Engineering */}
            <motion.div 
               initial={{ y: 50, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
               className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-12 md:mb-20">
              <div className="md:col-span-4">
                <h2 className="text-3xl md:text-4xl tracking-tight leading-tight font-normal">Electronics &<br/>Computer<br/>Engineering</h2>
              </div>
              <div className="md:col-span-8">
                <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-3xl font-normal">
                  Electronics and Computer Engineering is an integrated discipline that bridges the worlds of hardware and software, <strong className="text-black font-semibold">preparing students to meet the evolving demands of modern technology industries.</strong> By merging these two dynamic fields, the program offers a strong foundation in both electronics and computing, enabling students to develop versatile skills and a deep understanding of cutting-edge technologies. <strong className="text-black font-semibold">This cross-disciplinary approach empowers aspiring engineers</strong> to pursue diverse career paths across sectors—ranging from core electronics to software development and emerging tech innovations. The result is a new generation of multi-skilled, forward-thinking professionals equipped to design intelligent systems, drive innovation, and shape the future of technology with creativity and precision.
                </p>
              </div>
            </motion.div>

            {/* What we represent */}
            <motion.div 
               initial={{ y: 50, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
               className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-12 md:mb-20">
              <div className="md:col-span-6">
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-semibold tracking-tight">What we represent</h2>
              </div>
              <div className="md:col-span-6 flex items-start md:items-end">
                <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-xl font-normal">
                  We are committed to adhering to our vision and mission, which serve as guiding principles that illuminate our path. These core values not only ground us but also instill a profound sense of purpose in our endeavors, driving us to achieve excellence in all that we do.
                </p>
              </div>
            </motion.div>

            {/* Vision and Mission Cards with Cloud Background */}
            <motion.div 
               initial={{ y: 50, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
               className="relative w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden min-h-[500px] flex items-center justify-center p-6 sm:p-10 md:p-16">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image 
                  src="/clouds.png" 
                  alt="Clouds background" 
                  fill 
                  className="object-cover"
                />
              </div>
              
              {/* Cards Container */}
              <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
                {/* Vision Card */}
                <div className="bg-white/95 backdrop-blur-sm rounded-[1.5rem] md:rounded-[2rem] p-8 md:p-12 shadow-2xl flex flex-col items-center text-center transform transition duration-500 hover:scale-[1.02]">
                  <h3 className="text-3xl font-semibold mb-6 pb-6 border-b border-black/10 w-full">Vision</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed font-normal">
                    Develop into a centre of excellence in Electronics and Computer Engineering by producing technically competent professionals catering to the needs for Industry, Academia and Society.
                  </p>
                </div>

                {/* Mission Card */}
                <div className="bg-white/95 backdrop-blur-sm rounded-[1.5rem] md:rounded-[2rem] p-8 md:p-12 shadow-2xl flex flex-col items-center text-center transform transition duration-500 hover:scale-[1.02]">
                  <h3 className="text-3xl font-semibold mb-6 pb-6 border-b border-black/10 w-full">Mission</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed font-normal">
                    To pursue continuous improvement in learning, creativity and innovation among both faculty and students by enhanced infrastructure, state-of-the art laboratories and a unique learning environment. To inculcate in both faculty and students technical and entrepreneurial skills by professional activities to create socially relevant and sustainable solutions in the electronics and computer domain.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tabbed Gallery Section */}
        <div className="w-full bg-white relative z-20">
          <TabbedGallery items={stackSections} />
        </div>

        {/* Magazine Flipbook Integration */}
        <section className="w-full py-12 md:py-24 relative z-20 px-6 md:px-12 lg:px-24">
          <div className="w-full max-w-7xl mx-auto bg-[#205df5] rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 flex flex-col items-center shadow-lg">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-12 md:mb-16 tracking-tight text-center">
              Explore our publications
            </h2>

            {/* Bookshelf Layout */}
            <div className="w-full max-w-5xl mx-auto flex flex-col items-center mb-4 md:mb-10">
              <div className="w-full relative px-4 sm:px-12 flex justify-start pb-0 items-end min-h-[250px] md:min-h-[350px]">

                {/* Magazine Thumbnail */}
                <div
                  onClick={() => setIsMagazineOpen(true)}
                  className="group relative w-40 h-56 md:w-56 md:h-80 cursor-pointer transform transition-all duration-500 hover:-translate-y-4 z-10 ml-4 md:ml-12 mb-4"
                  style={{ perspective: "1000px" }}
                >
                  {/* Under-shadow */}
                  <div className="absolute -bottom-4 left-1 right-1 h-3 bg-black/60 blur-md rounded-full transition-all duration-500 group-hover:scale-90 group-hover:opacity-40"></div>

                  {/* Book Cover */}
                  <div className="absolute inset-0 bg-neutral-900 rounded-sm overflow-hidden shadow-[8px_4px_12px_rgba(0,0,0,0.4)] z-10 transition-transform duration-500 group-hover:rotate-y-[-5deg] flex items-center justify-center">
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
                  <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-r from-black/40 to-transparent z-20"></div>
                </div>

                {/* The Shelf */}
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-b from-white to-gray-300 rounded-sm z-0">
                  <div className="absolute inset-0 bg-white/20"></div>
                </div>
                {/* Shelf Under shadow */}
                <div className="absolute bottom-[-20px] left-6 right-6 h-10 bg-black/50 blur-xl z-[-1]"></div>
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
        <footer className="bg-black text-white pt-16 overflow-hidden relative border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-start text-left">
            {/* Logo */}
            <div className="mb-6 md:mb-8">
              <img src="/logo.svg" alt="Electras" className="w-12 h-12 md:w-14 md:h-14 opacity-90" />
            </div>
            
            {/* Text */}
            <div className="max-w-md mb-8">
              <p className="text-[#a1a1aa] text-sm md:text-base leading-relaxed font-normal">
                <strong className="text-white font-semibold">ELECTRAS</strong> is a vibrant student group focused on innovation in Electronics and Computer Science. Join us at <strong className="text-white font-semibold">ELECTRAS</strong>, where ambition and engineering excellence meet.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mb-2 md:mb-4">
              <a href="#" className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-[10px] md:rounded-xl border border-white/20 hover:bg-white/10 transition-colors">
                <Instagram className="w-4 h-4 md:w-[18px] md:h-[18px] text-white" />
              </a>
              <a href="#" className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-[10px] md:rounded-xl border border-white/20 hover:bg-white/10 transition-colors">
                <Linkedin className="w-4 h-4 md:w-[18px] md:h-[18px] text-white" />
              </a>
            </div>
          </div>

          {/* Giant Text */}
          <div className="w-full flex justify-center items-end px-4 pb-0 overflow-hidden relative pointer-events-none mt-16 md:mt-24">
            <h2 className="text-[28vw] leading-[0.70] font-semibold tracking-tighter whitespace-nowrap flex items-start m-0 p-0 text-[#222222]">
              Electras
            </h2>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}
