"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { Rocket } from "lucide-react";

export default function LaunchPage() {
  return (
    <div className="relative min-h-screen bg-black text-white w-full overflow-hidden flex flex-col items-center justify-center">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-blue-600/10 blur-[120px] rounded-full z-0 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 mt-[-5%]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto">
            <Image
              src="/logo.svg"
              alt="Electras Logo"
              fill
              className="object-contain opacity-90"
              priority
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative group mt-8"
        >
          {/* Button Outer Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-md opacity-30 group-hover:opacity-100 transition duration-500"></div>

          <Link
            href="/"
            className="relative flex items-center justify-center gap-4 px-14 py-6 md:px-20 md:py-8 bg-white text-black rounded-full font-semibold text-2xl md:text-4xl transition-transform duration-300 hover:scale-[1.03] overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              Launch Website
              <Rocket className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Giant Background Text */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 0.03, y: 0 }}
        transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-[-10%] left-0 w-full flex justify-center pointer-events-none z-0 overflow-hidden"
      >
        <h2 className="text-[35vw] leading-[0.70] font-semibold tracking-tighter whitespace-nowrap text-white">
          Electras
        </h2>
      </motion.div>
    </div>
  );
}
