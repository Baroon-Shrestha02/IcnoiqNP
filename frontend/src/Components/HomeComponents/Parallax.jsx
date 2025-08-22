import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import HomeServices from "./HomeServices";
import HomeProjects from "./HomeProjects";

export default function Parallax() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Slide Services up on scroll
  const yTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  return (
    <>
      {/* Parallax Container - Only for the transition effect */}
      <div className="relative h-[100vh]" ref={containerRef}>
        {/* Services Section - Moving Layer that slides up */}
        <motion.div
          style={{ y: yTransform }}
          className="absolute top-0 left-0 w-full h-[80vh] z-10"
        >
          <HomeServices />
        </motion.div>
      </div>

      {/* Projects Section - Normal scrolling */}
      <div className="relative z-20">
        <HomeProjects />
      </div>
    </>
  );
}
