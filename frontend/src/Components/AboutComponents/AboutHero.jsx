import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bgImages = [
  "Uploads/newAbout2.jpg",
  "Uploads/newAbout3.jpg",
  "Uploads/newAbout4.jpeg",
];

export default function AboutHero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bgImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full min-h-[60vh] md:min-h-[80vh] overflow-hidden rounded-b-4xl flex flex-col justify-end text-white">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={current}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImages[current]})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
            }}
            layoutId="about-background"
          />
        </AnimatePresence>
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-12">
          <div className="col-span-3">
            <h1 className="text-3xl md:text-6xl font-bold mb-4 drop-shadow-lg ">
              About <span className="logo">Iconiq</span>
            </h1>
            <p className="text-lg md:text-xl font-extralight max-w-2xl leading-relaxed text-white/90 drop-shadow-sm">
              We blend design, strategy, and technology to help brands grow.
              Discover how Iconiq turns ideas into impactful digital solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Optional: Carousel Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {bgImages.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === current ? "bg-white" : "bg-white/40"
            }`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
}
