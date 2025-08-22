import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HeroSectionWithCradle() {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const balls = [
    { id: 1, swing: true },
    { id: 2, swing: false },
    { id: 3, swing: false },
    { id: 4, swing: false },
    { id: 5, swing: true },
  ];

  return (
    <div className="relative w-full min-h-[80vh] bg-gradient-to-t from-[#4b0082] to-[#54A6F9] flex flex-col justify-center items-center px-4 py-12 overflow-hidden">
      {/* Newton's Cradle Balls */}
      <div className="flex gap-6 md:gap-8 lg:gap-10 justify-center items-end mb-12">
        {balls.map((ball, idx) => (
          <motion.div
            key={ball.id}
            className="rounded-full bg-white shadow-2xl border-4 border-gray-200"
            style={{
              width: "clamp(80px, 10vw, 150px)",
              height: "clamp(80px, 10vw, 150px)",
              transformOrigin: "top center",
            }}
            animate={
              ball.swing
                ? {
                    rotate: [0, ball.id === 1 ? -25 : 25, 0],
                    transition: {
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 1.5,
                      ease: "easeInOut",
                    },
                  }
                : {
                    y: [0, 0, 0],
                    transition: {
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 1.5,
                      ease: "easeInOut",
                      delay: 0.15 * idx,
                    },
                  }
            }
          />
        ))}
      </div>

      {/* Text Section */}
      <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-4xl">
        <h1 className="uppercase font-extrabold text-white text-3xl md:text-5xl lg:text-6xl tracking-tight">
          ICONIQ SOLUTIONS
        </h1>

        <p className="text-white text-lg md:text-xl font-light max-w-2xl">
          Real Impact Through Real Ideas — Inspired by Newton's Cradle.
        </p>

        <button className="px-8 py-3 bg-white rounded-full hover:scale-105 transition-transform">
          <span className="text-xl md:text-3xl font-bold bg-gradient-to-r from-[#4b0082] to-[#54A6F9] text-transparent bg-clip-text">
            Hire Us Now!
          </span>
        </button>
      </div>
    </div>
  );
}
