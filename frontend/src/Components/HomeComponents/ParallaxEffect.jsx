import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import HomeServices from "./HomeServices";
import HomeProjects from "./HomeProjects";
import HomeCTA from "./HomeCTA";

export default function ParallaxEffect() {
  const containerRef = useRef(null);
  const [projectsHeight, setProjectsHeight] = useState(0);
  const projectsRef = useRef(null);

  // Measure the actual height of projects section
  useEffect(() => {
    if (projectsRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setProjectsHeight(entry.contentRect.height);
        }
      });

      resizeObserver.observe(projectsRef.current);

      return () => resizeObserver.disconnect();
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform services section to slide up
  const yTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  // Calculate total height needed (services height + projects height)
  const totalHeight = Math.max(
    projectsHeight + window.innerHeight,
    window.innerHeight * 2
  );

  return (
    <>
      {/* Parallax Container with dynamic height */}
      <div
        className="relative pt-[25r]"
        ref={containerRef}
        style={{ height: `${totalHeight}px` }}
      >
        {/* Projects Section - Background Layer */}
        <div className="sticky top-0 w-full z-0 ">
          <div ref={projectsRef} className="w-full">
            <HomeProjects />
          </div>
        </div>

        {/* Services Section - Foreground Moving Layer */}
        <motion.div
          style={{ y: yTransform }}
          className="absolute top-0 left-0 w-full z-10"
        >
          <HomeServices />
        </motion.div>
      </div>
    </>
  );
}
