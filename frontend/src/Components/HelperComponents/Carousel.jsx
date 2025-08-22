import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";

const variants = {
  initial: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 50 : -50,
  }),
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -50 : 50,
    transition: { duration: 0.4 },
  }),
};

// Sample data for demonstration
const sampleData = [
  {
    quote:
      "This product has completely transformed our workflow. The efficiency gains are remarkable and the team loves using it every day.",
    name: "Sarah Johnson",
    position: "CEO, TechCorp",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b567?w=400&h=400&fit=crop&crop=face",
  },
  {
    quote:
      "Outstanding customer service and incredible attention to detail. I couldn't be happier with the results we've achieved.",
    name: "Michael Chen",
    position: "Marketing Director, InnovateLab",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  },
  {
    quote:
      "The best investment we've made this year. It's intuitive, powerful, and has exceeded all our expectations.",
    name: "Emily Rodriguez",
    position: "Product Manager, FutureScale",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
  },
];

export default function Carousel({ data = sampleData }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % data.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  // Autoplay functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      handleNext();
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [index, isPlaying]);

  const testimonial = data[index];

  return (
    <div className="relative w-full text-white">
      {/* Background overlay */}
      <div className="absolute inset- bg-opacity-20"></div>

      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Content Section */}
          <div className="lg:col-span-8 xl:col-span-9">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6 sm:space-y-8"
              >
                {/* Quote */}
                <div className="relative">
                  {/* <div className="absolute right-2  opacity-50">
                    <Quote className="" />
                  </div> */}
                  <p className="text-lg sm:text-xl md:text-3xl font-light leading-relaxed pl-6 sm:pl-10">
                    " {testimonial.quote} "
                  </p>
                </div>

                {/* Author info */}
                <div className="pl-6 sm:pl-10 pt-4">
                  <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm sm:text-base lg:text-lg  mt-1">
                    {testimonial.position}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Profile Image Section */}
          <div className="lg:col-span-4 xl:col-span-3 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name} profile`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute top-1/2 transform -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none z-20">
        <button
          onClick={handlePrev}
          className="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 bg-opacity-10 hover:bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-light transition-all duration-300 hover:scale-110 "
        >
          ←
        </button>
        <button
          onClick={handleNext}
          className="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14  bg-opacity-10 hover:bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-light transition-all duration-300 hover:scale-110 "
        >
          →
        </button>
      </div>
    </div>
  );
}
