import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function AboutHeroVideo() {
  const ref = useRef();
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Check screen size on component mount
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreen(); // run once
    window.addEventListener("resize", checkScreen); // update on resize
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.0001,
  });

  // 🎯 Limited growth - only grows from 0 to 0.6 of scroll progress
  // This means it stops growing at 60% of the scroll and stays at max size
  const scale = useTransform(smoothScroll, [0, 0.6], [0.75, 0.9]);
  const width = useTransform(smoothScroll, [0, 0.6], ["75%", "90%"]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="w-full min-h-[30vh] md:min-h-[80vh] flex justify-center items-center"
    >
      <motion.div
        ref={ref}
        style={{ scale, width }}
        className="max-w-[100vw] overflow-hidden rounded-2xl shadow-2xl will-change-transform transform-gpu"
      >
        {isMobile ? (
          <img
            src="/Uploads/webdev.jpg"
            alt="Fallback"
            loading="lazy"
            className="w-full h-auto object-cover rounded-2xl"
          />
        ) : (
          <video
            src="/Uploads/video2.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            disablePictureInPicture
            controlsList="nodownload noremoteplayback"
            loading="lazy"
            className="w-full h-auto object-cover rounded-2xl"
          />
        )}
      </motion.div>
    </motion.section>
  );
}
