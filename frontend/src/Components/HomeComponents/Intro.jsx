import React, { useState, useEffect, useRef } from "react";
import ScrollReveal from "../HelperComponents/ScrollReveal";

export default function Intro() {
  const headingRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 } // Adjust sensitivity as needed
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);

  return (
    <div className="container mx-auto mt-18">
      <div className="flex items-center justify-center gap-8 flex-col">
        <div
          ref={headingRef}
          className={`text-4xl md:text-7xl uppercase text-center transform transition-all font-extrabold duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          We
          <span className="logo bg-gradient-to-b from-[#C848C1] to-[#54A6F9] text-transparent bg-clip-text">
            '
          </span>
          re{" "}
          <span className="logo bg-gradient-to-b from-[#C848C1] to-[#54A6F9] text-transparent bg-clip-text">
            Iconiq
          </span>
        </div>

        <div className="container mx-auto ">
          <ScrollReveal
            key="para1"
            baseOpacity={0.1}
            baseRotation={0}
            blurStrength={40}
            wordAnimationEnd="center center"
            rotationEnd="center center"
            containerClassName=""
            textClassName="text-[clamp(1rem,3.3vw,1.9rem)] font-light text-center leading-relaxed text-neutral-700"
          >
            We help brands to grow through creative design, custom tailored
            websites, and strategic marketing. From startups to renowned names,
            we deliver bold and creative digital solutions with precision,
            passion, and purpose.
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
