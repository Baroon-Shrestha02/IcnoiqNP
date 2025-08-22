import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OrbitingAvatars from "./OrbitingAvatars";

// Mock avatar data - replace with actual images
const avatarData = [
  {
    id: 1,
    src: "Uploads/ae.png",
  },
  {
    id: 2,
    src: "Uploads/bracket.png",
  },
  {
    id: 3,
    src: "Uploads/digi.png",
  },
  {
    id: 4,
    src: "Uploads/ollustrator.png",
  },
  {
    id: 5,
    src: "Uploads/photoshop.png",
  },
  {
    id: 6,
    src: "Uploads/premier.png",
  },
  {
    id: 7,
    src: "Uploads/vs.jpg",
  },
];

// Carousel images
const carouselImages = [
  "https://images.unsplash.com/photo-1523958203904-cdcb402031fd?w=1600&h=900&fit=crop&auto=format&q=95",
  "https://images.unsplash.com/photo-1556761175-129418cb2dfe?w=1600&h=900&fit=crop&auto=format&q=95",
  "https://images.unsplash.com/photo-1523958203904-cdcb402031fd?w=1600&h=900&fit=crop&auto=format&q=95",
  "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=1600&h=900&fit=crop&auto=format&q=95",
  "https://images.unsplash.com/photo-1523958203904-cdcb402031fd?w=1600&h=900&fit=crop&auto=format&q=95",
];

export default function HeroSection3() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [initialAnimationComplete, setInitialAnimationComplete] =
    useState(false);
  const hasAnimated = useRef(false); // Track if animation has run

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / window.innerWidth,
        y: (e.clientY - window.innerHeight / 2) / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Carousel auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Responsive circle radius and avatar size
  const getCircleRadius = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768
        ? 120
        : window.innerWidth < 1024
        ? 160
        : 200;
    }
    return 200;
  };

  const getAvatarSize = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768 ? 50 : window.innerWidth < 1024 ? 70 : 90;
    }
    return 90;
  };

  const [circleRadius, setCircleRadius] = useState(getCircleRadius());
  const [avatarSize, setAvatarSize] = useState(getAvatarSize());

  useEffect(() => {
    const handleResize = () => {
      setCircleRadius(getCircleRadius());
      setAvatarSize(getAvatarSize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!hasAnimated.current) {
      const timer = setTimeout(() => {
        setInitialAnimationComplete(true);
        hasAnimated.current = true; // Mark as animated
      }, 2000 + avatarData.length * 100); // Wait for all initial animations to complete

      return () => clearTimeout(timer);
    }
  }, []); // Empty dependency array - only runs on mount

  return (
    <div className="min-h-[80vh] relative overflow-hidden rounded-b-4xl shadow-2xl shadow-slate-500">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="flex h-full"
          style={{
            width: `${carouselImages.length * 100}%`,
          }}
          animate={{
            x: `-${currentImageIndex * (100 / carouselImages.length)}%`,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {carouselImages.map((src, i) => (
            <div
              key={i}
              className="w-full flex-shrink-0 h-full relative"
              style={{ width: `${100 / carouselImages.length}%` }}
            >
              <img
                src={src}
                alt={`Slide ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70"></div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10 h-full min-h-[80vh] flex flex-col justify-center">
        {/* Mobile and Tablet Orbiting Avatars (Top) */}
        <div className="lg:hidden mb-8 flex justify-center">
          <OrbitingAvatars className="h-64 md:h-80" />
        </div>

        <div className="flex items-center justify-between h-full">
          {/* Left Content */}
          <div className="flex items-start gap-y-2 flex-col max-w-2xl lg:flex-1">
            <motion.p
              className="text-lg md:text-2xl max-w-xl leading-relaxed text-white font-extralight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Iconiq Ideas • Real Results
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="text-xl md:text-4xl max-w-xl leading-relaxed -mb-4 font-bold rounded-full text-transparent bg-clip-text bg-gradient-to-r from-[#C848C1] to-[#54A6F9]"
            >
              Welcome To
            </motion.p>

            <motion.h1
              className="text-3xl md:text-7xl font-bold leading-tight capitalize text-white logo"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Iconiq
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"></span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl max-w-3xl leading-relaxed text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A team of passionate creatives turning your ideas into reality—be
              it sleek websites, standout graphics, or smart digital marketing.
              <span className="">We're here to help your brand thrive.</span>
            </motion.p>
          </div>

          {/* Desktop Orbiting Avatars (Right) */}
          <div className="hidden lg:block lg:flex-1 relative h-full">
            <OrbitingAvatars className="h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
